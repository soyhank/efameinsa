import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const BASE = 'https://www.efameinsa.com';

// Páginas institucionales, de sector y de servicio cuyas URLs deben conservarse
const PAGINAS = [
  { slug: '', tipo: 'home' },
  { slug: 'nosotros', tipo: 'institucional' },
  { slug: 'contactenos', tipo: 'institucional' },
  { slug: 'politica-de-privacidad', tipo: 'institucional' },
  { slug: 'maquinas-lavadoras-para-industria-hotelera', tipo: 'sector' },
  { slug: 'maquinas-lavadoras-para-industria-comercial', tipo: 'sector' },
  { slug: 'maquinas-lavadoras-para-industria-textil', tipo: 'sector' },
  { slug: 'maquinas-lavadoras-para-industria-minera', tipo: 'sector' },
  { slug: 'maquinas-lavadoras-para-industria-hospitalaria', tipo: 'sector' },
  { slug: 'maquinas-lavadoras-para-agroindustria', tipo: 'sector' },
  { slug: 'maquinaria-para-lavanderia-autoservicio', tipo: 'sector' },
  { slug: 'sistema-wet-cleaning-aquatouch-girbau', tipo: 'sector' },
  { slug: 'servicios', tipo: 'servicio' },
  { slug: 'servicios/asesoria-en-proyectos-de-lavanderia', tipo: 'servicio' },
  { slug: 'servicios/asesoria-en-negocios-de-lavanderia', tipo: 'servicio' },
  { slug: 'servicios/asesoria-para-abrir-lavanderias-multi-housing', tipo: 'servicio' },
  { slug: 'soporte-tecnico', tipo: 'servicio' },
  { slug: 'equipos-autoclaves', tipo: 'servicio' },
];

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

const strip = (h) => decode(h.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();

async function get(url) {
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; EfameinsaMigration/1.0)' },
        signal: AbortSignal.timeout(30000),
      });
      if (r.ok) return await r.text();
    } catch { /* retry */ }
    await new Promise((r) => setTimeout(r, 700));
  }
  return null;
}

const out = [];
for (const p of PAGINAS) {
  const html = await get(`${BASE}/${p.slug}`);
  if (!html) {
    console.error('FALLO', p.slug);
    continue;
  }
  const t = html.match(/<title>([\s\S]*?)<\/title>/);
  const d = html.match(/<meta name="description" content="([^"]*)"/i);
  const k = html.match(/<meta name="keywords" content="([^"]*)"/i);
  // Titulares visibles (excluye el h1 del logo)
  const encabezados = [...html.matchAll(/<h([1-4])[^>]*>([\s\S]*?)<\/h\1>/g)]
    .map((m) => ({ nivel: +m[1], texto: strip(m[2]) }))
    .filter((h) => h.texto && h.texto.length > 2 && h.texto.length < 160);
  // Párrafos de contenido
  const parrafos = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)]
    .map((m) => strip(m[1]))
    .filter((x) => x.length > 60);

  out.push({
    ...p,
    url: `${BASE}/${p.slug}`,
    title: t ? strip(t[1]) : '',
    description: d ? decode(d[1]) : '',
    keywords: k ? decode(k[1]) : '',
    encabezados: encabezados.slice(0, 25),
    parrafos: [...new Set(parrafos)].slice(0, 20),
  });
  console.error(`${p.slug || '(home)'}: ${encabezados.length} encabezados, ${parrafos.length} párrafos`);
}

writeFileSync(fileURLToPath(new URL('./paginas.json', import.meta.url)), JSON.stringify(out, null, 2));
console.error('\nOK -> paginas.json');
