import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildRequest,
  composeEmail,
  contactConfig,
  contactHandler,
  parseRequest,
  sendEmail,
} from '../admin/contact.js';

const valid = {
  name: 'Ana Ruiz',
  company: 'Talleres Ruiz',
  email: 'ana@talleresruiz.es',
  attendees: '12',
  format: 'Workshop para equipos',
  message: 'Somos 12 en administración y queremos empezar por los documentos.',
};

/** Recoge el estado que dejaría Express, sin levantar el servidor. */
const mockResponse = () => {
  const res = {
    statusCode: 200,
    body: undefined,
    status(code) {
      res.statusCode = code;
      return res;
    },
    json(payload) {
      res.body = payload;
      return res;
    },
  };
  return res;
};

const ready = {
  provider: 'brevo',
  apiKey: 'test',
  to: 'destino@ejemplo.com',
  from: 'web@ejemplo.com',
  fromName: 'Adrián Gosálvez',
  ready: true,
};

/** Ejecuta `sendEmail` interceptando la red y devuelve la petición emitida. */
const captureRequest = async (config) => {
  const calls = [];
  const original = globalThis.fetch;
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options });
    return { ok: true, status: 201, text: async () => '' };
  };

  try {
    await sendEmail(config, parseRequest(valid).data);
  } finally {
    globalThis.fetch = original;
  }

  return calls[0];
};

/* ─────────────────────── Configuración ─────────────────────── */

test('contactConfig picks the provider from the key that is present', () => {
  const base = { CONTACT_TO: 'destino@ejemplo.com' };

  const brevo = contactConfig({ ...base, BREVO_API_KEY: 'x', BREVO_EMAIL_FROM: 'web@gosalvez.es' });
  assert.equal(brevo.provider, 'brevo');
  assert.equal(brevo.ready, true);

  const sendgrid = contactConfig({ ...base, SENDGRID_API_KEY: 'y', SENDGRID_EMAIL_FROM: 'web@gosalvez.es' });
  assert.equal(sendgrid.provider, 'sendgrid');
  assert.equal(sendgrid.ready, true);

  // Con las dos definidas gana Brevo, que es la que envía de verdad.
  const ambas = contactConfig({
    ...base,
    BREVO_API_KEY: 'x',
    SENDGRID_API_KEY: 'y',
    BREVO_EMAIL_FROM: 'web@gosalvez.es',
  });
  assert.equal(ambas.provider, 'brevo');
  assert.equal(ambas.apiKey, 'x');
});

test('contactConfig is not ready while anything essential is missing', () => {
  assert.equal(contactConfig({}).ready, false);
  assert.equal(contactConfig({ BREVO_API_KEY: 'x', BREVO_EMAIL_FROM: 'a@b.es' }).ready, false, 'sin destino');
  assert.equal(contactConfig({ BREVO_API_KEY: 'x', CONTACT_TO: 'a@b.es' }).ready, false, 'sin remitente');
  assert.equal(contactConfig({ BREVO_EMAIL_FROM: 'a@b.es', CONTACT_TO: 'a@b.es' }).ready, false, 'sin clave');

  // El nombre del remitente es opcional: tiene valor por defecto.
  const config = contactConfig({ BREVO_API_KEY: 'x', BREVO_EMAIL_FROM: 'a@b.es', CONTACT_TO: 'c@d.es' });
  assert.equal(config.fromName, 'Adrián Gosálvez');
});

/* ─────────────────────── Validación ────────────────────────── */

test('parseRequest accepts a complete request', () => {
  const { data, error } = parseRequest(valid);

  assert.equal(error, undefined);
  assert.equal(data.company, 'Talleres Ruiz');
  assert.equal(data.attendees, '12');
});

test('parseRequest requires the essential fields', () => {
  for (const field of ['name', 'company', 'email', 'message']) {
    const { error } = parseRequest({ ...valid, [field]: '   ' });
    assert.equal(error, field, field);
  }

  // Los asistentes son opcionales.
  assert.equal(parseRequest({ ...valid, attendees: '' }).error, undefined);
});

test('parseRequest rejects malformed addresses and oversized fields', () => {
  assert.equal(parseRequest({ ...valid, email: 'ana(at)ejemplo' }).error, 'email');
  assert.equal(parseRequest({ ...valid, message: 'x'.repeat(4001) }).error, 'message');
  assert.equal(parseRequest(null).error, 'body');
});

test('parseRequest flags the honeypot without touching the other fields', () => {
  assert.equal(parseRequest({ ...valid, website: 'http://spam.example' }).error, 'spam');
  assert.equal(parseRequest({ ...valid, website: '' }).error, undefined);
});

test('composeEmail names the company and omits an empty attendee count', () => {
  const withAttendees = composeEmail(parseRequest(valid).data);
  assert.match(withAttendees.subject, /Talleres Ruiz/);
  assert.match(withAttendees.text, /Asistentes: 12/);
  assert.match(withAttendees.text, /ana@talleresruiz\.es/);

  const without = composeEmail(parseRequest({ ...valid, attendees: '' }).data);
  assert.doesNotMatch(without.text, /Asistentes/);
});

/* ──────────────────── Petición por proveedor ───────────────── */

test('the Brevo request matches its transactional API', async () => {
  const call = await captureRequest(ready);

  assert.equal(call.url, 'https://api.brevo.com/v3/smtp/email');
  assert.equal(call.options.headers['api-key'], 'test');

  const payload = JSON.parse(call.options.body);
  assert.deepEqual(payload.sender, { email: 'web@ejemplo.com', name: 'Adrián Gosálvez' });
  assert.deepEqual(payload.to, [{ email: 'destino@ejemplo.com' }]);
  // Responder en el buzón contesta a la empresa, no al remitente técnico.
  assert.deepEqual(payload.replyTo, { email: 'ana@talleresruiz.es', name: 'Ana Ruiz' });
  assert.match(payload.textContent, /Somos 12 en administración/);
});

test('the SendGrid request matches its v3 API', async () => {
  const call = await captureRequest({ ...ready, provider: 'sendgrid' });

  assert.equal(call.url, 'https://api.sendgrid.com/v3/mail/send');
  assert.equal(call.options.headers.Authorization, 'Bearer test');

  const payload = JSON.parse(call.options.body);
  assert.deepEqual(payload.personalizations, [{ to: [{ email: 'destino@ejemplo.com' }] }]);
  assert.deepEqual(payload.from, { email: 'web@ejemplo.com', name: 'Adrián Gosálvez' });
  assert.deepEqual(payload.reply_to, { email: 'ana@talleresruiz.es', name: 'Ana Ruiz' });
  assert.equal(payload.content[0].type, 'text/plain');
});

test('both providers send the same subject and destination', () => {
  const data = parseRequest(valid).data;
  const brevo = buildRequest(ready, data);
  const sendgrid = buildRequest({ ...ready, provider: 'sendgrid' }, data);

  assert.equal(brevo.body.subject, sendgrid.body.subject);
  assert.equal(brevo.body.to[0].email, sendgrid.body.personalizations[0].to[0].email);
});

test('sendEmail surfaces a provider rejection with its status', async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async () => ({ ok: false, status: 401, text: async () => 'unauthorized' });

  try {
    await assert.rejects(() => sendEmail(ready, parseRequest(valid).data), /brevo 401/);
  } finally {
    globalThis.fetch = original;
  }
});

/* ───────────────────────── Manejador ───────────────────────── */

test('the handler delivers a valid request and answers ok', async () => {
  const sent = [];
  const handler = contactHandler({ config: ready, send: async (config, data) => sent.push({ config, data }) });
  const res = mockResponse();

  await handler({ body: valid }, res);

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, { ok: true });
  assert.equal(sent.length, 1);
  assert.equal(sent[0].data.email, valid.email);
  // El destino sale de la configuración del servidor, nunca de la petición.
  assert.equal(sent[0].config.to, 'destino@ejemplo.com');
});

test('the handler never lets the client choose the recipient', async () => {
  const sent = [];
  const handler = contactHandler({ config: ready, send: async (config, data) => sent.push({ config, data }) });

  await handler(
    { body: { ...valid, to: 'atacante@ejemplo.com', CONTACT_TO: 'atacante@ejemplo.com' } },
    mockResponse(),
  );

  assert.equal(sent[0].config.to, 'destino@ejemplo.com');
  assert.equal(sent[0].data.to, undefined);
});

test('the handler answers 400 for invalid input and sends nothing', async () => {
  let called = false;
  const handler = contactHandler({ config: ready, send: async () => { called = true; } });
  const res = mockResponse();

  await handler({ body: { ...valid, email: 'no-es-un-email' } }, res);

  assert.equal(res.statusCode, 400);
  assert.equal(called, false);
});

test('a bot gets a clean ok and no email is sent', async () => {
  let called = false;
  const handler = contactHandler({ config: ready, send: async () => { called = true; } });
  const res = mockResponse();

  await handler({ body: { ...valid, website: 'http://spam.example' } }, res);

  // No se le dice al bot que ha sido detectado.
  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, { ok: true });
  assert.equal(called, false);
});

test('an unconfigured server answers 503 instead of crashing', async () => {
  const handler = contactHandler({ config: { ready: false }, send: async () => {} });
  const res = mockResponse();

  await handler({ body: valid }, res);

  assert.equal(res.statusCode, 503);
});

test('a provider failure answers 502 and does not leak the reason', async () => {
  const handler = contactHandler({
    config: ready,
    send: async () => {
      throw new Error('brevo 401: invalid key for destino@ejemplo.com');
    },
  });
  const res = mockResponse();

  await handler({ body: valid }, res);

  assert.equal(res.statusCode, 502);
  assert.deepEqual(res.body, { error: 'delivery' });
});
