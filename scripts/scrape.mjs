import { writeFileSync } from 'node:fs';

const BASE = 'https://www.efameinsa.com';

const CATEGORIES = [
  { slug: 'lavadoras-industriales-en-venta-lima-peru', linea: 'industrial' },
  { slug: 'lavadoras-tenidoras-en-venta-lima-peru', linea: 'industrial' },
  { slug: 'lavadoras-con-barreras-sanitarias-en-venta-lima-peru', linea: 'industrial' },
  { slug: 'secadoras-industriales-en-venta-lima-peru', linea: 'industrial' },
  { slug: 'calandrias-industriales-en-venta-lima-peru', linea: 'industrial' },
  { slug: 'prensas-de-planchado-en-venta-lima-peru', linea: 'industrial' },
  { slug: 'centrifugas-hidroextractoras-en-venta-lima-peru', linea: 'industrial' },
  { slug: 'mesas-vaporizadoras-en-venta-lima-peru', linea: 'industrial' },
  { slug: 'calderas-pirotubulares-en-venta-lima-peru', linea: 'industrial' },
  { slug: 'coches-para-ropa-en-venta-lima-peru', linea: 'industrial' },
  { slug: 'revisadoras-de-telas-en-venta-lima-peru', linea: 'industrial' },
  { slug: 'insumos-en-venta-lima-peru', linea: 'industrial' },
  { slug: 'lavadoras-comerciales-en-venta-lima-peru', linea: 'comercial' },
  { slug: 'secadoras-comerciales-en-venta-lima-peru', linea: 'comercial' },
  { slug: 'lavadoras-al-seco-ecologicas-en-venta-lima-peru', linea: 'comercial' },
  { slug: 'mesas-de-planchado-en-venta-lima-peru', linea: 'comercial' },
  { slug: 'calderines-comerciales-en-venta-lima-peru', linea: 'comercial' },
];

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&aacute;/g, 'á')
    .replace(/&eacute;/g, 'é')
    .replace(/&iacute;/g, 'í')
    .replace(/&oacute;/g, 'ó')
    .replace(/&uacute;/g, 'ú')
    .replace(/&ntilde;/g, 'ñ')
    .replace(/&Aacute;/g, 'Á')
    .replace(/&Eacute;/g, 'É')
    .replace(/&Iacute;/g, 'Í')
    .replace(/&Oacute;/g, 'Ó')
    .replace(/&Uacute;/g, 'Ú')
    .replace(/&Ntilde;/g, 'Ñ');

const strip = (html) => decode(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();

async function get(url) {
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; EfameinsaMigration/1.0)' },
        signal: AbortSignal.timeout(30000),
      });
      if (r.ok) return await r.text();
    } catch { /* retry */ }
    await new Promise((r) => setTimeout(r, 800));
  }
  return null;
}

function parseCategory(html) {
  const out = [];
  // Cada producto vive en un bloque .product-thumb
  const blocks = html.split(/<div class="product-thumb/).slice(1);
  for (const b of blocks) {
    const hrefM = b.match(/href="(https:\/\/www\.efameinsa\.com\/[^"]+)"/);
    if (!hrefM) continue;
    const url = hrefM[1].replace(/\/$/, '');
    if (url.includes('index.php')) continue;
    // El listado enlaza la variante anidada /categoria/producto; el canonical es el último segmento
    const slug = url.split('/').pop().split('?')[0];
    if (!slug) continue;
    // Imagen en data-src (lazy load); alt/title llevan el nombre comercial
    const imgM = b.match(/data-src="([^"]+)"/);
    const altM = b.match(/<img[^>]*\salt="([^"]*)"/);
    const descM = b.match(/<p class="description"[^>]*>([\s\S]*?)<\/p>/);
    out.push({
      slug,
      nombre: altM && altM[1].trim() ? decode(altM[1]).trim() : slug.replace(/-/g, ' '),
      imagen: imgM ? decodeURI(imgM[1]).replace(/-\d+x\d+(\.\w+)$/, '$1') : null,
      imagenThumb: imgM ? imgM[1] : null,
      resumen: descM ? strip(descM[1]) : '',
    });
  }
  return out;
}

function parseCategoryMeta(html) {
  const t = html.match(/<title>([\s\S]*?)<\/title>/);
  const d = html.match(/<meta name="description" content="([^"]*)"/i);
  const h1 = html.match(/<h1 class="h2">([\s\S]*?)<\/h1>/);
  const intro = html.match(/<h1 class="h2">[\s\S]*?<\/h1>\s*<p>([\s\S]*?)<\/p>/);
  return {
    title: t ? strip(t[1]) : '',
    description: d ? decode(d[1]) : '',
    h1: h1 ? strip(h1[1]) : '',
    intro: intro ? strip(intro[1]) : '',
  };
}

function parseProduct(html) {
  const t = html.match(/<title>([\s\S]*?)<\/title>/);
  const d = html.match(/<meta name="description" content="([^"]*)"/i);
  const marca = html.match(/itemprop="manufacturer"[^>]*>([^<]+)</);
  const modelo = html.match(/itemprop="model"[^>]*>([^<]+)</);

  // Descripción larga vive en la sección zproducto-info-descripcion
  const descSec = html.match(/id="zproducto-info-descripcion">([\s\S]*?)<\/section>/);
  const descripcionLarga = descSec ? strip(descSec[1].replace(/<h3[^>]*>[\s\S]*?<\/h3>/, '')) : '';

  // Bloques de características: cada uno lleva imagen + título + párrafo
  const caracteristicas = [];
  const featStart = html.indexOf('id="zproducto-info-caracteristicas"');
  if (featStart !== -1) {
    const featEnd = html.indexOf('id="tab-specification"', featStart);
    const featHtml = html.slice(featStart, featEnd === -1 ? featStart + 40000 : featEnd);
    for (const blk of featHtml.split(/<div class="col-sm-6[^"]*"/).slice(1)) {
      const img = blk.match(/src="([^"]+)"/);
      const h = blk.match(/<h4[^>]*>([\s\S]*?)<\/h4>/);
      const p = blk.match(/<p[^>]*>([\s\S]*?)<\/p>/);
      const titulo = h ? strip(h[1]) : '';
      const texto = p ? strip(p[1]) : '';
      if (titulo || texto) {
        caracteristicas.push({ titulo, texto, imagen: img ? img[1] : null });
      }
    }
  }

  // Imagen principal: la cache 518x478; guardamos también el original sin sufijo de tamaño
  const imgM = html.match(/src="(https:\/\/www\.efameinsa\.com\/image\/cache\/catalog\/productos\/[^"]*-\d+x\d+\.\w+)"/);
  const imagen = imgM ? imgM[1] : null;

  // Galería: imágenes de catálogo del producto, excluyendo banners
  const gal = [...html.matchAll(/src="(https:\/\/www\.efameinsa\.com\/image\/catalog\/productos\/[^"]+)"/g)]
    .map((m) => m[1])
    .filter((u) => !u.includes('/banner/'));

  // Tabla de especificaciones: cada celda es <td><span>Clave:</span><span>Valor</span></td>
  const specs = [];
  const tabSpec = html.match(/id="tab-specification"([\s\S]*?)<\/table>/);
  if (tabSpec) {
    for (const cell of tabSpec[1].matchAll(/<td[^>]*>\s*<span>([^<]*)<\/span>\s*<span>([\s\S]*?)<\/span>\s*<\/td>/g)) {
      const k = strip(cell[1]).replace(/:$/, '');
      const v = strip(cell[2]);
      if (k && v) specs.push({ k, v });
    }
  }

  return {
    title: t ? strip(t[1]) : '',
    description: d ? decode(d[1]) : '',
    marca: marca ? strip(marca[1]) : '',
    modelo: modelo ? strip(modelo[1]) : '',
    descripcionLarga,
    caracteristicas,
    imagen,
    galeria: [...new Set(gal)].slice(0, 10),
    specs,
  };
}

const catalogo = [];
const productosVistos = new Map();

for (const cat of CATEGORIES) {
  const html = await get(`${BASE}/${cat.slug}?limit=100`);
  if (!html) {
    console.error('FALLO categoria', cat.slug);
    continue;
  }
  const meta = parseCategoryMeta(html);
  const productos = parseCategory(html);
  console.error(`${cat.slug}: ${productos.length} productos`);
  catalogo.push({ ...cat, ...meta, productos: productos.map((p) => p.slug) });
  for (const p of productos) {
    if (!productosVistos.has(p.slug)) {
      productosVistos.set(p.slug, { ...p, categoria: cat.slug, linea: cat.linea });
    }
  }
}

console.error(`\nTotal productos únicos: ${productosVistos.size}\nDescargando fichas...`);

const slugs = [...productosVistos.keys()];
const CONC = 8;
for (let i = 0; i < slugs.length; i += CONC) {
  const chunk = slugs.slice(i, i + CONC);
  await Promise.all(
    chunk.map(async (slug) => {
      const html = await get(`${BASE}/${slug}`);
      if (!html) return;
      Object.assign(productosVistos.get(slug), parseProduct(html));
    })
  );
  console.error(`  ${Math.min(i + CONC, slugs.length)}/${slugs.length}`);
}

writeFileSync('catalogo.json', JSON.stringify({ categorias: catalogo, productos: [...productosVistos.values()] }, null, 2));
console.error('\nOK -> catalogo.json');
