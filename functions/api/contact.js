// Receives the contact form and emails it to Sovrin Group.
//
// This runs on Cloudflare Pages. It needs two values set on the Pages
// project under Settings, Environment variables:
//
//   RESEND_API_KEY   the key from resend.com
//   CONTACT_FROM     the verified sending address, e.g. website@sovringroup.com
//
// CONTACT_TO is optional and defaults to the address below.
//
// If either value is missing the endpoint answers 503 and the page falls
// back to the visitor's own mail program, so the form still works.

const TO_DEFAULT = 'info@sovringroup.com';

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

export async function onRequestPost({ request, env }) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return json(400, { ok: false, error: 'bad_request' });
  }

  const value = (key) => String(form.get(key) ?? '').trim();

  // Honeypot. People never see this field, so anything in it is a bot.
  // Answer as though it worked; there is no reason to tell them otherwise.
  if (value('website')) return json(200, { ok: true });

  const name = value('name');
  const phone = value('phone');
  const email = value('email');

  if (!name || !phone || !email) return json(400, { ok: false, error: 'missing_fields' });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json(400, { ok: false, error: 'bad_email' });

  const apiKey = env.RESEND_API_KEY;
  const from = env.CONTACT_FROM;
  if (!apiKey || !from) return json(503, { ok: false, error: 'not_configured' });

  const text = [
    'Name: ' + name,
    'Organization: ' + (value('organization') || 'not given'),
    'Preferred callback number: ' + phone,
    'Preferred callback day / time: ' + (value('callback_time') || 'no preference'),
    'Email: ' + email,
  ].join('\n');

  let sent;
  try {
    sent = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [env.CONTACT_TO || TO_DEFAULT],
        reply_to: email,
        subject: 'Callback request: ' + name,
        text,
      }),
    });
  } catch {
    return json(502, { ok: false, error: 'send_failed' });
  }

  if (!sent.ok) return json(502, { ok: false, error: 'send_failed' });

  return json(200, { ok: true });
}
