import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';

const BASE = 'https://www.efameinsa.com';
const OUT = 'C:/Users/hank/efameinsa/public/img/productos';
const data = JSON.parse(readFileSync('catalogo.json', 'utf8'));

// Las imágenes wp-content son restos de la web WordPress anterior y devuelven 404: se descartan.
// Las rutas relativas ("image/catalog/...") se resuelven contra el dominio.
const normalizar = (u) => {
  if (!u) return null;
  if (u.includes('/wp-content/')) return null;
  if (u.startsWith('//')) return 'https:' + u;
  if (u.startsWith('http://')) return u.replace('http://', 'https://');
  if (u.startsWith('https://')) return u;
  return `${BASE}/${u.replace(/^\/+/, '')}`;
};

const jobs = [];
for (const p of data.productos) {
  p.imagen = normalizar(p.imagen);
  p.galeria = (p.galeria || []).map(normalizar).filter(Boolean);
  p.caracteristicas = (p.caracteristicas || []).map((c) => ({ ...c, imagen: normalizar(c.imagen) }));

  if (p.imagen) jobs.push({ url: p.imagen, dest: `${p.slug}/principal.jpg` });
  p.galeria.forEach((g, i) => jobs.push({ url: g, dest: `${p.slug}/g${i + 1}.jpg` }));
  p.caracteristicas.forEach((c, i) => {
    if (c.imagen) jobs.push({ url: c.imagen, dest: `${p.slug}/c${i + 1}.jpg` });
  });
}

const seen = new Set();
const unique = jobs.filter((j) => (seen.has(j.dest) ? false : (seen.add(j.dest), true)));
const pendientes = unique.filter((j) => !(existsSync(join(OUT, j.dest)) && statSync(join(OUT, j.dest)).size > 500));
console.error(`${unique.length} totales, ${pendientes.length} pendientes`);

async function download(job) {
  const full = join(OUT, job.dest);
  mkdirSync(dirname(full), { recursive: true });
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(encodeURI(decodeURI(job.url)), {
        headers: { 'User-Agent': 'Mozilla/5.0', Referer: BASE + '/' },
        signal: AbortSignal.timeout(45000),
      });
      if (!r.ok) continue;
      const ct = r.headers.get('content-type') || '';
      if (!ct.startsWith('image/')) continue;
      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.length < 500) continue;
      writeFileSync(full, buf);
      return true;
    } catch { /* retry */ }
    await new Promise((r) => setTimeout(r, 800));
  }
  return false;
}

let ok = 0;
let fail = 0;
const CONC = 6;
for (let i = 0; i < pendientes.length; i += CONC) {
  const results = await Promise.all(pendientes.slice(i, i + CONC).map(download));
  results.forEach((r) => (r ? ok++ : fail++));
  if (i % 60 === 0) console.error(`  ${i}/${pendientes.length} (ok:${ok} fail:${fail})`);
}

// Anotar rutas locales sólo para los archivos que realmente existen
const existe = (rel) => existsSync(join(OUT, rel)) && statSync(join(OUT, rel)).size > 500;
for (const p of data.productos) {
  const base = `/img/productos/${p.slug}`;
  p.imagenLocal = p.imagen && existe(`${p.slug}/principal.jpg`) ? `${base}/principal.jpg` : null;
  p.galeriaLocal = p.galeria.map((_, i) => `${p.slug}/g${i + 1}.jpg`).filter(existe).map((r) => `/img/productos/${r}`);
  p.caracteristicas = p.caracteristicas.map((c, i) => ({
    ...c,
    imagenLocal: existe(`${p.slug}/c${i + 1}.jpg`) ? `${base}/c${i + 1}.jpg` : null,
  }));
}

writeFileSync('catalogo.json', JSON.stringify(data, null, 2));
const conImg = data.productos.filter((p) => p.imagenLocal).length;
console.error(`\nOK:${ok} FAIL:${fail} | productos con imagen principal: ${conImg}/${data.productos.length}`);
