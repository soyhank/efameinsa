import sharp from 'sharp';
import { readFileSync, writeFileSync, readdirSync, statSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = fileURLToPath(new URL('../public/img/productos', import.meta.url));
const CATALOGO = fileURLToPath(new URL('./catalogo.json', import.meta.url));
const data = JSON.parse(readFileSync(CATALOGO, 'utf8'));

const archivos = [];
for (const dir of readdirSync(OUT)) {
  const d = join(OUT, dir);
  if (!statSync(d).isDirectory()) continue;
  for (const f of readdirSync(d)) {
    if (f.endsWith('.jpg')) archivos.push(join(d, f));
  }
}
console.error(`${archivos.length} imágenes a optimizar`);

let antes = 0;
let despues = 0;
let n = 0;
const CONC = 8;

async function convertir(ruta) {
  const size = statSync(ruta).size;
  antes += size;
  const destino = ruta.replace(/\.jpg$/, '.webp');
  // Las principales se usan a ~600px; galería y características a ~800px de ancho máximo
  const ancho = ruta.endsWith('principal.jpg') ? 700 : 900;
  await sharp(ruta)
    .resize({ width: ancho, withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(destino);
  despues += statSync(destino).size;
  unlinkSync(ruta);
}

for (let i = 0; i < archivos.length; i += CONC) {
  await Promise.all(
    archivos.slice(i, i + CONC).map((f) =>
      convertir(f).catch((e) => console.error('fallo', f, e.message))
    )
  );
  n += CONC;
  if (n % 200 < CONC) console.error(`  ${Math.min(n, archivos.length)}/${archivos.length}`);
}

// Actualizar extensiones en el catálogo
const webp = (u) => (u ? u.replace(/\.jpg$/, '.webp') : u);
for (const p of data.productos) {
  p.imagenLocal = webp(p.imagenLocal);
  p.galeriaLocal = (p.galeriaLocal || []).map(webp);
  p.caracteristicas = (p.caracteristicas || []).map((c) => ({ ...c, imagenLocal: webp(c.imagenLocal) }));
}
writeFileSync(CATALOGO, JSON.stringify(data, null, 2));

const mb = (b) => (b / 1024 / 1024).toFixed(1);
console.error(`\nAntes: ${mb(antes)} MB -> Después: ${mb(despues)} MB`);
