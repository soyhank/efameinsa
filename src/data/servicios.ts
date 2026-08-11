/** Páginas de servicio. Los slugs replican los del sitio anterior (incluida la subcarpeta /servicios/). */
export type Servicio = {
  slug: string;
  /** Ruta completa desde la raíz */
  ruta: string;
  nombre: string;
  titulo: string;
  title: string;
  description: string;
  entradilla: string;
  secciones: { titulo: string; texto: string }[];
  entregables?: string[];
};

export const servicios: Servicio[] = [
  {
    slug: 'asesoria-en-proyectos-de-lavanderia',
    ruta: '/servicios/asesoria-en-proyectos-de-lavanderia',
    nombre: 'Proyectos de lavandería',
    titulo: 'Asesoría en proyectos de lavandería',
    title: 'Asesoría y Diseño de Proyectos de Lavandería Industrial | Efameinsa',
    description:
      'Diseñamos su lavandería industrial completa: cálculo de carga, distribución de equipos, instalaciones de vapor, agua y desagüe, montaje y puesta en marcha. Lima y provincias.',
    entradilla:
      'Una lavandería mal dimensionada se paga durante años en horas extra, reprocesos y consumo de energía. Diseñamos el área completa antes de que se compre la primera máquina.',
    secciones: [
      {
        titulo: 'Cálculo de carga real',
        texto:
          'Partimos de los kilos de ropa por día, el tipo de prenda y las horas de operación disponibles. De ahí sale la capacidad de lavado, la de secado y la de planchado, que casi nunca coinciden entre sí.',
      },
      {
        titulo: 'Distribución del área',
        texto:
          'Definimos el recorrido de la ropa sucia a la limpia sin cruces, la ubicación de cada equipo y los espacios de maniobra. En lavandería hospitalaria esto además es requisito sanitario.',
      },
      {
        titulo: 'Instalaciones de servicio',
        texto:
          'Especificamos el requerimiento de vapor, agua blanda, desagüe, energía eléctrica y extracción, de modo que la obra civil se ejecute una sola vez y bien.',
      },
      {
        titulo: 'Montaje y puesta en marcha',
        texto:
          'Instalamos, calibramos programas de lavado y capacitamos al personal que va a operar los equipos día a día.',
      },
    ],
    entregables: [
      'Memoria de cálculo de capacidad instalada',
      'Plano de distribución de equipos',
      'Especificación de instalaciones de vapor, agua y energía',
      'Cotización de equipamiento y montaje',
      'Cronograma de implementación',
    ],
  },
  {
    slug: 'asesoria-en-negocios-de-lavanderia',
    ruta: '/servicios/asesoria-en-negocios-de-lavanderia',
    nombre: 'Asesoría de negocio',
    titulo: 'Asesoría para abrir un negocio de lavandería',
    title: 'Asesoría para Abrir un Negocio de Lavandería en Perú | Efameinsa',
    description:
      'Le ayudamos a evaluar la inversión, el punto de equilibrio y el equipamiento para abrir una lavandería en Perú. Asesoría previa a la compra de máquinas.',
    entradilla:
      'Antes de recomendar equipos, revisamos si el negocio cierra. Un local mal ubicado o mal tarifado no se arregla con una lavadora más grande.',
    secciones: [
      {
        titulo: 'Evaluación de la inversión',
        texto:
          'Estimamos la inversión en equipos, instalaciones y capital de trabajo, y la contrastamos con la capacidad de pago del proyecto.',
      },
      {
        titulo: 'Punto de equilibrio',
        texto:
          'Calculamos cuántos kilos diarios necesita facturar para cubrir costos, considerando agua, energía, detergente y personal.',
      },
      {
        titulo: 'Elección del modelo de atención',
        texto:
          'Autoservicio a moneda, lavandería atendida o servicio a domicilio: cada uno exige equipos y horarios distintos.',
      },
      {
        titulo: 'Selección de equipos',
        texto:
          'Recién con lo anterior definido elegimos las máquinas, priorizando bajo consumo y disponibilidad de repuestos.',
      },
    ],
  },
  {
    slug: 'asesoria-para-abrir-lavanderias-multi-housing',
    ruta: '/servicios/asesoria-para-abrir-lavanderias-multi-housing',
    nombre: 'Multi-housing',
    titulo: 'Lavandería para edificios multifamiliares',
    title: 'Lavandería Multi-Housing para Edificios y Condominios | Efameinsa',
    description:
      'Implementación de cuartos de lavado en edificios multifamiliares, condominios y residencias universitarias en Perú. Equipos a moneda de uso intensivo.',
    entradilla:
      'El cuarto de lavado compartido es un servicio que revaloriza el edificio y genera ingreso. Necesita equipos pensados para uso desatendido.',
    secciones: [
      {
        titulo: 'Aprovechamiento del espacio',
        texto:
          'Configuraciones apilables de lavadora y secadora que multiplican la capacidad en los pocos metros que suele tener el cuarto de lavado.',
      },
      {
        titulo: 'Cobro y control',
        texto:
          'Sistemas a moneda o ficha para operación sin personal, con control del uso por unidad.',
      },
      {
        titulo: 'Mantenimiento programado',
        texto:
          'Plan preventivo para que las máquinas estén disponibles, porque en este modelo nadie supervisa la falla hasta que un residente reclama.',
      },
    ],
  },
];

export const buscarServicio = (slug: string) => servicios.find((s) => s.slug === slug) ?? null;
