import assert from 'node:assert/strict';
import test from 'node:test';

import { composeEmail, contactConfig, contactHandler, parseRequest, sendViaSendgrid } from '../admin/contact.js';

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
  apiKey: 'test',
  to: 'destino@ejemplo.com',
  from: 'web@ejemplo.com',
  fromName: 'gosalvez.es',
  ready: true,
};

test('contactConfig reads the SendGrid variables', () => {
  const config = contactConfig({
    SENDGRID_API_KEY: 'SG.abc',
    SENDGRID_EMAIL_FROM: 'web@gosalvez.es',
    SENDGRID_EMAIL_FROM_NAME: 'Adrián Gosálvez',
    CONTACT_TO: 'destino@ejemplo.com',
  });

  assert.equal(config.ready, true);
  assert.equal(config.apiKey, 'SG.abc');
  assert.equal(config.to, 'destino@ejemplo.com');
  assert.equal(config.fromName, 'Adrián Gosálvez');
});

test('contactConfig is not ready while any variable is missing', () => {
  const base = {
    SENDGRID_API_KEY: 'SG.abc',
    SENDGRID_EMAIL_FROM: 'web@gosalvez.es',
    CONTACT_TO: 'destino@ejemplo.com',
  };

  assert.equal(contactConfig(base).ready, true);
  // El nombre del remitente es opcional: tiene valor por defecto.
  assert.equal(contactConfig(base).fromName, 'Adrián Gosálvez');

  for (const key of Object.keys(base)) {
    const partial = { ...base };
    delete partial[key];
    assert.equal(contactConfig(partial).ready, false, key);
  }
});

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

  await handler({ body: { ...valid, to: 'atacante@ejemplo.com', CONTACT_TO: 'atacante@ejemplo.com' } }, mockResponse());

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

  await handler({ body: { ...valid, website: 'http://spam.example' }, }, res);

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
      throw new Error('sendgrid 401: invalid key for destino@ejemplo.com');
    },
  });
  const res = mockResponse();

  await handler({ body: valid }, res);

  assert.equal(res.statusCode, 502);
  assert.deepEqual(res.body, { error: 'delivery' });
});

test('sendViaSendgrid builds the payload the v3 API expects', async () => {
  const calls = [];
  const original = globalThis.fetch;
  // Un envío aceptado devuelve 202 sin cuerpo.
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options });
    return { ok: true, status: 202, text: async () => '' };
  };

  try {
    await sendViaSendgrid(ready, parseRequest(valid).data);
  } finally {
    globalThis.fetch = original;
  }

  const [call] = calls;
  assert.equal(call.url, 'https://api.sendgrid.com/v3/mail/send');
  assert.equal(call.options.headers.Authorization, 'Bearer test');

  const payload = JSON.parse(call.options.body);
  assert.deepEqual(payload.personalizations, [{ to: [{ email: 'destino@ejemplo.com' }] }]);
  assert.deepEqual(payload.from, { email: 'web@ejemplo.com', name: 'gosalvez.es' });
  // Responder en el buzón contesta a la empresa, no al remitente técnico.
  assert.deepEqual(payload.reply_to, { email: 'ana@talleresruiz.es', name: 'Ana Ruiz' });
  assert.match(payload.subject, /Talleres Ruiz/);
  assert.equal(payload.content[0].type, 'text/plain');
  assert.match(payload.content[0].value, /Somos 12 en administración/);
});

test('sendViaSendgrid surfaces a provider rejection', async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async () => ({ ok: false, status: 401, text: async () => 'unauthorized' });

  try {
    await assert.rejects(() => sendViaSendgrid(ready, parseRequest(valid).data), /sendgrid 401/);
  } finally {
    globalThis.fetch = original;
  }
});
