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
  /** Qué hizo Efameinsa en el proyecto, en viñetas persuasivas */
  alcance: string[];
  imagenes: { src: string; alt: string }[];
};

export const proyectos: Proyecto[] = [
  {
    slug: 'inen',
    nombre: 'Instituto Nacional de Enfermedades Neoplásicas (INEN)',
    lugar: 'Lima',
    descripcion:
      'El principal centro oncológico del país, donde la ropa de sala pasa por los protocolos de asepsia más exigentes del sistema de salud. Su lavandería procesa a diario prendas de pacientes inmunodeprimidos: aquí un equipo detenido o un lavado deficiente no es una molestia, es un riesgo clínico.',
    alcance: [
      'Suministro e instalación de lavadoras de grado hospitalario, secadoras y calandrias industriales para el ciclo completo de la ropa de sala.',
      'Configuración del flujo de lavandería respetando la separación entre zona contaminada y zona limpia que exige el protocolo hospitalario.',
      'Puesta en marcha, capacitación del personal operativo y soporte técnico continuo con repuestos disponibles en Lima.',
    ],
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
      'La red de EsSalud que atiende a los asegurados de Pasco, a más de 4,300 metros de altura. Operar una lavandería hospitalaria en altura castiga a las máquinas: la red necesitaba equipos que resistieran trabajo continuo lejos de los talleres de la capital.',
    alcance: [
      'Provisión e instalación del equipamiento completo de lavandería: lavado, secado y planchado en un solo proyecto.',
      'Selección de equipos dimensionados para operación continua en condiciones de altura y clima exigente.',
      'Entrega funcionando: instalación, pruebas con carga real y capacitación del personal antes de la puesta en servicio.',
    ],
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
      'El hospital de referencia de la DIRESA Cusco concentra la atención especializada de toda la región: su lavandería no puede parar porque no hay otra que la reemplace. El proyecto priorizó equipos de bajo consumo de agua y energía, un costo que en un hospital público se paga todos los días.',
    alcance: [
      'Suministro de lavadoras ecológicas de alto centrifugado que reducen el consumo de agua y el gasto de secado.',
      'Calandrias industriales para entregar sábanas y ropa de cama listas para sala sin repaso manual.',
      'Acompañamiento técnico en la instalación y arranque, con servicio postventa que atiende Lima y provincias.',
    ],
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
      'Hospital ejecutado con UNOPS, el organismo de las Naciones Unidas para proyectos de infraestructura pública. Adjudicarse un contrato UNOPS significa pasar auditorías internacionales de especificación técnica, plazos y garantías — un filtro que pocas empresas del rubro en el Perú han superado.',
    alcance: [
      'Suministro e instalación de los equipos de lavandería del hospital bajo especificaciones técnicas internacionales.',
      'Cumplimiento de los plazos y estándares documentales que exige la contratación con organismos multilaterales.',
      'Calandrias y lavadoras industriales entregadas operativas, con capacitación al personal del hospital.',
    ],
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
      'Uno de los hospitales de alta complejidad de La Libertad, también ejecutado con UNOPS bajo estándares internacionales de contratación pública. La lavandería quedó equipada de punta a punta — lavado, secado y planchado — por un solo proveedor responsable de que todo funcione en conjunto.',
    alcance: [
      'Equipamiento integral de la lavandería: lavadoras industriales, secadoras y línea de planchado en una sola adjudicación.',
      'Ingeniería de detalle para que los equipos conversen entre sí: capacidades balanceadas para que ninguna etapa sea cuello de botella.',
      'Una adjudicación UNOPS más en el historial de Efameinsa: la validación externa de que cumplimos lo que especificamos.',
    ],
    imagenes: [
      { src: '/img/proyectos/virgen-puerta/lavadoras-industriales-efameinsa-hospital-la-libertad.webp', alt: 'Lavadoras industriales Efameinsa en el Hospital Virgen de la Puerta' },
      { src: '/img/proyectos/virgen-puerta/equipos-de-lavanderias-industriales-efameinsa.webp', alt: 'Equipos de lavandería industrial instalados' },
      { src: '/img/proyectos/virgen-puerta/maquinas-lavadoras-peru-efameinsa.webp', alt: 'Máquinas lavadoras industriales del proyecto' },
      { src: '/img/proyectos/virgen-puerta/venta-de-lavadoras-automaticas-efamein.webp', alt: 'Lavadoras automáticas instaladas en la lavandería' },
    ],
  },
];
