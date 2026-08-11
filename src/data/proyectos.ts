/**
 * Proyectos de equipamiento ejecutados. Textos e imágenes provienen del sitio
 * anterior (efameinsa.com/proyectos); las fotos fueron corregidas de color y
 * convertidas a WebP en `public/img/proyectos/`.
 */
export type Proyecto = {
  slug: string;
  nombre: string;
  lugar: string;
  descripcion: string;
  imagenes: { src: string; alt: string }[];
};

export const proyectos: Proyecto[] = [
  {
    slug: 'inen',
    nombre: 'Instituto Nacional de Enfermedades Neoplásicas (INEN)',
    lugar: 'Lima',
    descripcion:
      'Garantiza la atención integral del paciente oncológico y dirige a nivel nacional los servicios de salud de las enfermedades neoplásicas, además de la investigación y docencia propias del Instituto. Equipamos su lavandería con máquinas de grado hospitalario.',
    imagenes: [
      { src: '/img/proyectos/inen/lavadoras-hospitalarias-efameinsa-inen.webp', alt: 'Frontis del Instituto Nacional de Enfermedades Neoplásicas' },
      { src: '/img/proyectos/inen/maquinaria-para-lavanderia-industrial-efameinsa.webp', alt: 'Maquinaria de lavandería industrial instalada en el INEN' },
      { src: '/img/proyectos/inen/maquinas-lavadoras-de-ropa-industriales.webp', alt: 'Máquinas lavadoras industriales de ropa hospitalaria' },
      { src: '/img/proyectos/inen/calandrias-industriales-en-venta-efamein.webp', alt: 'Calandria industrial Efamein en la lavandería del INEN' },
    ],
  },
  {
    slug: 'pasco',
    nombre: 'Red Asistencial EsSalud Pasco',
    lugar: 'Pasco',
    descripcion:
      'Institución de seguridad social de salud que busca el bienestar de los asegurados y su acceso oportuno a prestaciones integrales y de calidad. Proveímos e instalamos el equipamiento completo de su lavandería.',
    imagenes: [
      { src: '/img/proyectos/pasco/equipamiento-de-lavanderia-industrial.webp', alt: 'Equipamiento de lavandería industrial en la Red Asistencial de Pasco' },
      { src: '/img/proyectos/pasco/lavadoras-y-secadoras-para-lavanderia.webp', alt: 'Lavadoras y secadoras industriales instaladas' },
      { src: '/img/proyectos/pasco/maquinas-de-lavanderia-industrial-essalud-pasco.webp', alt: 'Máquinas de lavandería industrial en EsSalud Pasco' },
      { src: '/img/proyectos/pasco/maquinas-lavadoras-industriales-de-ropa.webp', alt: 'Lavadoras industriales de ropa en funcionamiento' },
    ],
  },
  {
    slug: 'cusco',
    nombre: 'Hospital Regional del Cusco',
    lugar: 'Cusco',
    descripcion:
      'Órgano técnico operativo desconcentrado de la DIRESA Cusco, encargado de proveer servicios públicos de atención integral de salud especializada en la región. Su lavandería opera con equipos suministrados por Efameinsa.',
    imagenes: [
      { src: '/img/proyectos/cusco/proyecto-de-lavandria-de-ropa-peru.webp', alt: 'Proyecto de lavandería hospitalaria en el Hospital Regional del Cusco' },
      { src: '/img/proyectos/cusco/lavadoras-ecologicas-para-lavanderia.webp', alt: 'Lavadoras ecológicas de bajo consumo instaladas' },
      { src: '/img/proyectos/cusco/proveedores-de-equipos-de-lavanderia.webp', alt: 'Equipos de lavandería industrial suministrados' },
      { src: '/img/proyectos/cusco/calandrias-industriales-lima-peru.webp', alt: 'Calandria industrial para planchado de ropa hospitalaria' },
    ],
  },
  {
    slug: 'abancay',
    nombre: 'Hospital II de Abancay',
    lugar: 'Apurímac',
    descripcion:
      'Proyecto ejecutado con UNOPS, organismo de las Naciones Unidas que elabora proyectos de desarrollo y provee servicios especializados. Efameinsa suministró e instaló los equipos de lavandería del hospital.',
    imagenes: [
      { src: '/img/proyectos/abancay/asesoria-lavanderia-industrial-hospital-abancay.webp', alt: 'Asesoría e instalación de lavandería industrial en el Hospital II de Abancay' },
      { src: '/img/proyectos/abancay/lavadoras-industriales-para-lavanderia-hospital-abancay.webp', alt: 'Lavadoras industriales instaladas en el hospital' },
      { src: '/img/proyectos/abancay/equipos-para-lavanderia-industrial-hospital-abancay.webp', alt: 'Equipos de lavandería industrial del proyecto' },
      { src: '/img/proyectos/abancay/calandrias-industriales-efamein.webp', alt: 'Calandria industrial Efamein instalada' },
    ],
  },
  {
    slug: 'virgen-puerta',
    nombre: 'Hospital Virgen de la Puerta',
    lugar: 'La Libertad',
    descripcion:
      'Proyecto ejecutado con UNOPS bajo estándares internacionales de contratación pública. La lavandería del hospital quedó equipada de punta a punta: lavado, secado y planchado.',
    imagenes: [
      { src: '/img/proyectos/virgen-puerta/lavadoras-industriales-efameinsa-hospital-la-libertad.webp', alt: 'Lavadoras industriales Efameinsa en el Hospital Virgen de la Puerta' },
      { src: '/img/proyectos/virgen-puerta/equipos-de-lavanderias-industriales-efameinsa.webp', alt: 'Equipos de lavandería industrial instalados' },
      { src: '/img/proyectos/virgen-puerta/maquinas-lavadoras-peru-efameinsa.webp', alt: 'Máquinas lavadoras industriales del proyecto' },
      { src: '/img/proyectos/virgen-puerta/venta-de-lavadoras-automaticas-efamein.webp', alt: 'Lavadoras automáticas instaladas en la lavandería' },
    ],
  },
];
