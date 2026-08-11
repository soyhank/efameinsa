/**
 * Comprueba que toda URL viva del sitio anterior tenga en el sitio nuevo
 * una página propia o una redirección 301. Es la red de seguridad del SEO:
 * si esto falla, se pierde posicionamiento al publicar.
 */
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const raiz = fileURLToPath(new URL('..', import.meta.url));
const estatico = join(raiz, '.vercel/output/static');
const config = JSON.parse(readFileSync(join(raiz, '.vercel/output/config.json'), 'utf8'));

const { categorias, productos } = JSON.parse(readFileSync(join(raiz, 'src/data/catalogo.json'), 'utf8'));

// Inventario de URLs del sitio anterior que devolvían 200 o 301/302
const antiguas = new Set();
antiguas.add('/');
for (const p of productos) {
  antiguas.add(`/${p.slug}`);
  antiguas.add(`/${p.categoria}/${p.slug}`);
}
for (const c of categorias) {
  antiguas.add(`/${c.slug}`);
  antiguas.add(`/equipos-de-lavanderia/${c.slug}`);
}
for (const extra of [
  '/nosotros',
  '/contactenos',
  '/politica-de-privacidad',
  '/trabaja-con-nosotros',
  '/equipos-de-lavanderia',
  '/soporte-tecnico',
  '/equipos-autoclaves',
  '/servicios',
  '/servicios/asesoria-en-proyectos-de-lavanderia',
  '/servicios/asesoria-en-negocios-de-lavanderia',
  '/servicios/asesoria-para-abrir-lavanderias-multi-housing',
  '/maquinas-lavadoras-para-industria-hotelera',
  '/maquinas-lavadoras-para-industria-comercial',
  '/maquinas-lavadoras-para-industria-textil',
  '/maquinas-lavadoras-para-industria-minera',
  '/maquinas-lavadoras-para-industria-hospitalaria',
  '/maquinas-lavadoras-para-industria-alimentaria',
  '/maquinas-lavadoras-para-agroindustria',
  '/maquinaria-para-lavanderia-autoservicio',
  '/maquinaria-para-lavanderia-tipo-servicio',
  '/sistema-wet-cleaning-aquatouch-girbau',
  '/servicios-lavanderia',
  '/proyectos',
  '/equipos-de-lavanderia-para-clinicas',
  '/equipos-de-lavanderia-para-restaurantes',
  '/equipos-de-lavanderia-para-spas',
  '/equipos-de-lavanderia-para-saunas',
  '/equipos-de-lavanderia-para-industria-de-bebidas',
  '/unimac',
  '/seitz',
  '/bimap',
  '/sidimondial',
]) {
  antiguas.add(extra);
}

const redirecciones = (config.routes ?? []).filter((r) => r.status === 301 && r.headers?.Location);

const tienePagina = (ruta) => {
  const limpia = ruta === '/' ? '/index.html' : `${ruta}/index.html`;
  return existsSync(join(estatico, limpia.replace(/^\//, '')));
};

const tieneRedireccion = (ruta) =>
  redirecciones.some((r) => {
    try {
      return new RegExp(r.src).test(ruta);
    } catch {
      return false;
    }
  });

const huerfanas = [];
let conPagina = 0;
let conRedireccion = 0;

for (const ruta of [...antiguas].sort()) {
  if (tienePagina(ruta)) conPagina++;
  else if (tieneRedireccion(ruta)) conRedireccion++;
  else huerfanas.push(ruta);
}

console.log(`URLs antiguas evaluadas: ${antiguas.size}`);
console.log(`  con página propia:  ${conPagina}`);
console.log(`  con redirección 301: ${conRedireccion}`);
console.log(`  SIN destino:         ${huerfanas.length}`);

if (huerfanas.length) {
  console.log('\nURLs huérfanas:');
  for (const h of huerfanas) console.log('  ' + h);
  process.exit(1);
}
console.log('\nOK: ninguna URL posicionada queda huérfana.');
