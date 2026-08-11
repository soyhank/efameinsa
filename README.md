# EFAMEINSA — sitio web

Migración del sitio de [Efameinsa S.A.](https://www.efameinsa.com) desde OpenCart a Astro 7,
conservando íntegramente el esquema de URLs ya posicionado en Google.

## Qué resuelve esta migración

El sitio anterior corría sobre OpenCart con Bootstrap 3.3.5 y jQuery 2.1.1: 17 hojas de estilo,
15 scripts y 89 imágenes en la portada, sin datos estructurados ni WebP. Además servía cada ficha
de producto en dos direcciones distintas (plana y anidada bajo su categoría) y arrastraba páginas
rotas del sitio WordPress previo.

Aquí el sitio es estático, con una única ruta renderizada en servidor (el endpoint del formulario).

## Arquitectura de URLs

Las URLs posicionadas se conservan **exactamente**. La raíz aloja tres tipos de página, resueltos
por `src/pages/[slug].astro`:

| Tipo | Ejemplo | Cantidad |
|---|---|---|
| Categoría | `/lavadoras-industriales-en-venta-lima-peru` | 17 |
| Ficha de producto | `/lavadora-industrial-uw45-unimac` | 211 |
| Sector | `/maquinas-lavadoras-para-industria-hotelera` | 8 |

El resto son rutas estáticas: `/nosotros`, `/contactenos`, `/servicios/*`, `/marcas/*`, `/blog/*`,
`/cotizar`, `/soporte-tecnico`, `/equipos-autoclaves`, `/politica-de-privacidad`,
`/trabaja-con-nosotros`.

Las 483 redirecciones 301 desde el esquema antiguo se generan en `src/data/redirecciones.ts` y se
inyectan en `astro.config.mjs`. `npm run verificar` comprueba que ninguna URL antigua quede huérfana.

## Comandos

```sh
npm install
npm run dev          # servidor de desarrollo
npm run build        # build de producción
npm run verificar    # comprueba cobertura de URLs antiguas (requiere build previo)
```

## Variables de entorno

El formulario de cotización (`/api/cotizacion`) envía por [Resend](https://resend.com).
Sin la clave configurada el endpoint responde 503 y la interfaz ofrece WhatsApp y teléfono
como alternativa, en lugar de simular un envío exitoso.

| Variable | Obligatoria | Descripción |
|---|---|---|
| `RESEND_API_KEY` | sí, para recibir leads | Clave de API de Resend |
| `EMAIL_DESTINO` | no | Correo receptor. Por defecto `central@efameinsa.com` |
| `EMAIL_REMITENTE` | no | Remitente verificado en Resend |

Configúrelas en Vercel → Settings → Environment Variables.

## Datos del catálogo

`src/data/catalogo.json` contiene los 211 productos con marca, modelo, especificaciones,
características e imágenes, extraídos del sitio anterior mediante los scripts de `scripts/`:

```sh
node scripts/scrape.mjs           # vuelca catálogo y fichas
node scripts/fix-images.mjs       # descarga imágenes y normaliza rutas
node scripts/optimize-images.mjs  # convierte a WebP (105 MB -> 26 MB)
node scripts/scrape-paginas.mjs   # metadatos de páginas institucionales
```

Se conservan por si hace falta re-sincronizar contra el sitio antiguo antes del corte de DNS.
Una vez migrado, el catálogo se edita directamente en el JSON.

## Pendiente antes de apuntar el dominio

1. Configurar `RESEND_API_KEY` en Vercel.
2. Verificar en Search Console que las redirecciones respondan 301.
3. Enviar el nuevo `sitemap-index.xml`.
4. Migrar el ID de Google Analytics / Tag Manager del sitio anterior.
