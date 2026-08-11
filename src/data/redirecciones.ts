import { categorias, productos } from './catalogo';

/**
 * Redirecciones 301 desde las URLs antiguas de OpenCart.
 *
 * El sitio anterior servía cada ficha en dos direcciones (plana y anidada bajo su
 * categoría) y además mantenía un prefijo /equipos-de-lavanderia/ para las páginas
 * de sector. El canonical siempre apuntaba a la variante plana, así que ésa es la
 * que conservamos; el resto redirige para no perder los enlaces entrantes.
 */
export function construirRedirecciones(): Record<string, string> {
  const r: Record<string, string> = {};

  // 1. Ficha anidada bajo su categoría -> ficha plana
  for (const p of productos) {
    r[`/${p.categoria}/${p.slug}`] = `/${p.slug}`;
  }

  // 2. Fichas de barrera sanitaria: en el sitio viejo colgaban de /equipos-de-lavanderia/
  for (const p of productos) {
    r[`/equipos-de-lavanderia/${p.categoria}/${p.slug}`] = `/${p.slug}`;
  }

  // 3. Categorías bajo el prefijo /equipos-de-lavanderia/
  for (const c of categorias) {
    r[`/equipos-de-lavanderia/${c.slug}`] = `/${c.slug}`;
  }

  // 4. Páginas de sector y servicio que vivían bajo el prefijo
  const bajoPrefijo = [
    'maquinas-lavadoras-para-industria-hotelera',
    'maquinas-lavadoras-para-industria-comercial',
    'maquinas-lavadoras-para-industria-textil',
    'maquinas-lavadoras-para-industria-minera',
    'maquinas-lavadoras-para-industria-hospitalaria',
    'maquinas-lavadoras-para-agroindustria',
    'maquinaria-para-lavanderia-autoservicio',
    'sistema-wet-cleaning-aquatouch-girbau',
  ];
  for (const s of bajoPrefijo) {
    r[`/equipos-de-lavanderia/${s}`] = `/${s}`;
  }

  return {
    ...r,

    // 5. Páginas que el sitio anterior ya redirigía o que quedaron rotas
    '/maquinaria-para-lavanderia-tipo-servicio': '/maquinas-lavadoras-para-industria-comercial',
    '/equipos-de-lavanderia/maquinaria-para-lavanderia-tipo-servicio': '/maquinas-lavadoras-para-industria-comercial',
    '/servicios-lavanderia': '/soporte-tecnico',
    '/equipos-de-lavanderia/servicios-lavanderia': '/soporte-tecnico',
    '/equipos-de-lavanderia/proyectos': '/proyectos',
    // Devolvía 302 al inicio en el sitio anterior; la intención real es la línea comercial
    '/maquinas-lavadoras-para-industria-alimentaria': '/maquinas-lavadoras-para-agroindustria',
    '/equipos-de-lavanderia/maquinas-lavadoras-para-industria-alimentaria': '/maquinas-lavadoras-para-agroindustria',
    '/equipos-de-lavanderia/maquinaria-para-lavanderia-autoservicio': '/maquinaria-para-lavanderia-autoservicio',

    // 6. Subpáginas de la línea comercial del sitio anterior
    '/maquinas-lavadoras-para-industria-comercial/autoservicio': '/maquinaria-para-lavanderia-autoservicio',
    '/maquinas-lavadoras-para-industria-comercial/dry-cleaning': '/lavadoras-al-seco-ecologicas-en-venta-lima-peru',
    '/maquinas-lavadoras-para-industria-comercial/multihousing': '/servicios/asesoria-para-abrir-lavanderias-multi-housing',
    '/equipos-de-lavanderia/maquinas-lavadoras-para-industria-comercial/autoservicio': '/maquinaria-para-lavanderia-autoservicio',
    '/equipos-de-lavanderia/maquinas-lavadoras-para-industria-comercial/dry-cleaning': '/lavadoras-al-seco-ecologicas-en-venta-lima-peru',
    '/equipos-de-lavanderia/maquinas-lavadoras-para-industria-comercial/multihousing':
      '/servicios/asesoria-para-abrir-lavanderias-multi-housing',

    // 7. Páginas de sector que devolvían 302 y que ahora se atienden desde el sector correspondiente
    '/equipos-de-lavanderia-para-clinicas': '/maquinas-lavadoras-para-industria-hospitalaria',
    '/equipos-de-lavanderia-para-restaurantes': '/maquinas-lavadoras-para-industria-hotelera',
    '/equipos-de-lavanderia-para-spas': '/maquinas-lavadoras-para-industria-hotelera',
    '/equipos-de-lavanderia-para-saunas': '/maquinas-lavadoras-para-industria-hotelera',
    '/equipos-de-lavanderia-para-industria-de-bebidas': '/maquinas-lavadoras-para-agroindustria',

    // 8. Páginas de fabricante del sitio anterior
    '/unimac': '/marcas/unimac',
    '/primus': '/marcas/primus',
    '/girbau': '/marcas/girbau',
    '/adc': '/marcas/adc',
    '/milnor': '/marcas/milnor',
    '/gmp': '/marcas/gmp',
    '/seitz': '/marcas/seitz',
    '/bimap': '/marcas/bimap',
    '/sidimondial': '/marcas/sidi-mondial',
    '/sailstar': '/marcas/sailstar',

    // 9. Rutas internas de OpenCart
    '/index.php': '/',
    '/checkout': '/cotizar',
    '/login': '/contactenos',
    '/create-account': '/contactenos',
    '/forgot-password': '/contactenos',
    '/brands': '/marcas',
  };
}
