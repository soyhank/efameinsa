// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

import { construirRedirecciones } from './src/data/redirecciones.ts';

export default defineConfig({
  site: 'https://www.efameinsa.com',
  trailingSlash: 'never',

  // Redirecciones 301 desde el esquema de URLs de OpenCart. Ver src/data/redirecciones.ts.
  redirects: construirRedirecciones(),

  integrations: [
    sitemap({
      // Las fichas de producto y las categorías son el núcleo del posicionamiento;
      // las institucionales pesan menos en la prioridad de rastreo.
      serialize(item) {
        const ruta = new URL(item.url).pathname;
        if (ruta === '/') return { ...item, priority: 1.0, changefreq: 'weekly' };
        if (ruta.endsWith('-en-venta-lima-peru')) return { ...item, priority: 0.9, changefreq: 'weekly' };
        if (/^\/(maquinas-lavadoras|maquinaria-para|sistema-wet)/.test(ruta))
          return { ...item, priority: 0.8, changefreq: 'monthly' };
        if (ruta.startsWith('/servicios') || ruta.startsWith('/blog')) return { ...item, priority: 0.7, changefreq: 'monthly' };
        return { ...item, priority: 0.6, changefreq: 'monthly' };
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: vercel(),
});