/**
 * Endpoint público de solicitudes de formación.
 *
 * El formulario de `/es/formacion` publica aquí. El correo lo envía el
 * servidor, no el navegador: así la dirección de destino nunca llega al
 * cliente. Vive en `CONTACT_TO` y no aparece en el HTML, en el JavaScript ni
 * en las peticiones de red.
 *
 * El transporte es la API de SendGrid por HTTP, sin dependencias: Node 20 ya
 * trae `fetch`.
 *
 * El proveedor está aislado en `sendViaSendgrid()` y en `contactConfig()`:
 * cambiarlo no toca la validación, el límite de peticiones ni el formulario.
 */
import rateLimit from 'express-rate-limit';

const SENDGRID_ENDPOINT = 'https://api.sendgrid.com/v3/mail/send';

/** Límites de tamaño por campo. Recortan el abuso y el correo basura. */
const LIMITS = {
  name: 120,
  company: 120,
  email: 160,
  attendees: 10,
  format: 60,
  message: 4000,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Configuración leída al arrancar; si falta algo, el endpoint responde 503. */
export function contactConfig(env = process.env) {
  const apiKey = env.SENDGRID_API_KEY;
  const from = env.SENDGRID_EMAIL_FROM;

  return {
    apiKey,
    from,
    fromName: env.SENDGRID_EMAIL_FROM_NAME || 'Adrián Gosálvez',
    // El destino es lo único que no se comparte con los demás proyectos:
    // es la dirección que se mantiene fuera del navegador.
    to: env.CONTACT_TO,
    ready: Boolean(apiKey && from && env.CONTACT_TO),
  };
}

/**
 * Valida y normaliza el cuerpo de la solicitud.
 *
 * Devuelve `{ data }` o `{ error }`. Nunca lanza: un cuerpo malformado es una
 * respuesta 400, no una caída del servidor.
 */
export function parseRequest(body) {
  if (!body || typeof body !== 'object') return { error: 'body' };

  // Honeypot: un campo oculto que sólo rellenan los bots.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return { error: 'spam' };
  }

  const clean = {};
  for (const [field, max] of Object.entries(LIMITS)) {
    const raw = body[field];
    const value = typeof raw === 'string' ? raw.trim() : raw == null ? '' : String(raw).trim();
    if (value.length > max) return { error: field };
    clean[field] = value;
  }

  for (const field of ['name', 'company', 'email', 'message']) {
    if (!clean[field]) return { error: field };
  }

  if (!EMAIL_PATTERN.test(clean.email)) return { error: 'email' };

  return { data: clean };
}

/** Cuerpo del correo. Texto plano: es una notificación, no una newsletter. */
export function composeEmail(data) {
  const lines = [
    `Nombre:     ${data.name}`,
    `Empresa:    ${data.company}`,
    `Email:      ${data.email}`,
    data.attendees ? `Asistentes: ${data.attendees}` : null,
    `Modalidad:  ${data.format || '—'}`,
    '',
    data.message,
  ].filter((line) => line !== null);

  return {
    subject: `Formación IA — ${data.company} (${data.name})`,
    text: lines.join('\n'),
  };
}

/** Envío real por la API de SendGrid. Exportada para poder verificar el payload. */
export async function sendViaSendgrid(config, data) {
  const { subject, text } = composeEmail(data);

  const response = await fetch(SENDGRID_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: config.to }] }],
      from: { email: config.from, name: config.fromName },
      // Responder al correo contesta directamente a quien lo envió.
      reply_to: { email: data.email, name: data.name },
      subject,
      content: [{ type: 'text/plain', value: text }],
    }),
  });

  // Un envío aceptado responde 202, sin cuerpo.
  if (!response.ok) {
    throw new Error(`sendgrid ${response.status}: ${await response.text()}`);
  }
}

/** Límite propio: más estricto que el del admin, y cuenta también los envíos correctos. */
export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // ventana de 1 hora
  max: 5, // 5 solicitudes por IP y hora
  message: { error: 'rate_limit' },
  standardHeaders: true,
  legacyHeaders: false,
});

/** Manejador del endpoint. `deps.send` se sustituye en los tests. */
export function contactHandler(deps = {}) {
  const config = deps.config ?? contactConfig();
  const deliver = deps.send ?? sendViaSendgrid;

  return async (req, res) => {
    if (!config.ready) {
      console.error('❌ /api/contacto sin configurar: faltan SENDGRID_API_KEY, SENDGRID_EMAIL_FROM o CONTACT_TO');
      return res.status(503).json({ error: 'unavailable' });
    }

    const { data, error } = parseRequest(req.body);

    // Al bot se le responde que todo ha ido bien: no se le da información.
    if (error === 'spam') return res.json({ ok: true });
    if (error) return res.status(400).json({ error: 'invalid' });

    try {
      await deliver(config, data);
      return res.json({ ok: true });
    } catch (cause) {
      console.error('❌ No se pudo enviar la solicitud de formación:', cause.message);
      return res.status(502).json({ error: 'delivery' });
    }
  };
}
