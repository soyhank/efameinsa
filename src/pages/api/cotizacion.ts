import type { APIRoute } from 'astro';
import { EMPRESA } from '../../data/sitio';

// Única ruta renderizada en el servidor; el resto del sitio es estático.
export const prerender = false;

type Solicitud = {
  nombre?: string;
  empresa?: string;
  telefono?: string;
  email?: string;
  sector?: string;
  mensaje?: string;
  contexto?: string;
  acepta?: string;
  empresa_web?: string;
};

const json = (datos: unknown, status = 200) =>
  new Response(JSON.stringify(datos), { status, headers: { 'Content-Type': 'application/json' } });

const limpiar = (v: unknown, max = 2000) =>
  typeof v === 'string' ? v.trim().slice(0, max).replace(/[<>]/g, '') : '';

export const POST: APIRoute = async ({ request }) => {
  let datos: Solicitud;
  try {
    datos = await request.json();
  } catch {
    return json({ mensaje: 'Solicitud inválida.' }, 400);
  }

  // El honeypot lo rellenan los bots: se responde 200 para no darles señal de fallo.
  if (limpiar(datos.empresa_web)) return json({ ok: true });

  const nombre = limpiar(datos.nombre, 120);
  const telefono = limpiar(datos.telefono, 40);
  const email = limpiar(datos.email, 160);
  const mensaje = limpiar(datos.mensaje, 4000);

  if (!nombre || !telefono || !email || !mensaje) {
    return json({ mensaje: 'Faltan datos obligatorios.' }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return json({ mensaje: 'El correo no parece válido.' }, 400);
  }

  const empresa = limpiar(datos.empresa, 160);
  const sector = limpiar(datos.sector, 80);
  const contexto = limpiar(datos.contexto, 200);

  const cuerpo = [
    `Nombre:   ${nombre}`,
    `Empresa:  ${empresa || '—'}`,
    `Teléfono: ${telefono}`,
    `Correo:   ${email}`,
    `Sector:   ${sector || '—'}`,
    `Origen:   ${contexto || 'Formulario general'}`,
    '',
    'Mensaje:',
    mensaje,
  ].join('\n');

  const apiKey = import.meta.env.RESEND_API_KEY;
  const destino = import.meta.env.EMAIL_DESTINO ?? EMPRESA.email;
  const remitente = import.meta.env.EMAIL_REMITENTE ?? 'Web Efameinsa <onboarding@resend.dev>';

  // Sin credencial configurada el lead se pierde: es mejor decirlo que fingir que se envió.
  if (!apiKey) {
    console.warn('[cotizacion] RESEND_API_KEY no configurada. Solicitud recibida:\n' + cuerpo);
    return json(
      { mensaje: 'El envío por correo aún no está activo. Escríbanos por WhatsApp y le atendemos de inmediato.' },
      503
    );
  }

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: remitente,
        to: [destino],
        reply_to: email,
        subject: `Cotización web — ${nombre}${empresa ? ` (${empresa})` : ''}`,
        text: cuerpo,
      }),
    });

    if (!r.ok) {
      console.error('[cotizacion] Resend respondió', r.status, await r.text());
      return json({ mensaje: 'No pudimos enviar la solicitud. Escríbanos por WhatsApp.' }, 502);
    }
    return json({ ok: true });
  } catch (e) {
    console.error('[cotizacion] Fallo de red', e);
    return json({ mensaje: 'No pudimos enviar la solicitud. Escríbanos por WhatsApp.' }, 502);
  }
};
