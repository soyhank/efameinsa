/**
 * Páginas de sector. Son las que capturan la búsqueda por intención de negocio
 * ("lavandería para hotel", "equipos para campamento minero") en vez de por producto.
 * Los slugs replican los del sitio anterior para no perder el posicionamiento.
 */
export type Sector = {
  slug: string;
  nombre: string;
  titulo: string;
  title: string;
  description: string;
  entradilla: string;
  dolor: string;
  argumentos: { titulo: string; texto: string }[];
  categorias: string[];
  imagen?: string;
};

export const sectores: Sector[] = [
  {
    slug: 'maquinas-lavadoras-para-industria-hotelera',
    nombre: 'Hotelería',
    imagen: '/img/productos/calandria-de-planchado-g14-25-gmp/principal.webp',
    titulo: 'Equipos de lavandería para hoteles',
    title: 'Lavadoras Industriales para Hoteles | Lavandería Hotelera | Efameinsa',
    description:
      'Equipos de lavandería industrial para hoteles en Lima y provincias: lavadoras, secadoras, calandrias y prensas. Proyecto llave en mano y servicio técnico propio.',
    entradilla:
      'Ropa de cama, toallas y mantelería con rotación diaria exigen equipos que no paren. Diseñamos la lavandería completa de su hotel, desde el cálculo de carga hasta la puesta en marcha.',
    dolor:
      'Un hotel que terceriza su lavandería paga por kilo toda la vida y depende de los tiempos de un proveedor. Con lavandería propia recupera la inversión y controla la calidad del acabado.',
    argumentos: [
      {
        titulo: 'Dimensionado por número de habitaciones',
        texto:
          'Calculamos los kilos de ropa por día según ocupación y categoría del hotel, y proponemos la combinación de lavadora, secadora y planchado que cubre el turno sin cuellos de botella.',
      },
      {
        titulo: 'Acabado de mantelería y ropa de cama',
        texto:
          'Las calandrias y prensas de planchado dejan sábanas y manteles listos para habitación, sin el repaso manual que consume horas de personal.',
      },
      {
        titulo: 'Consumo de agua y energía bajo control',
        texto:
          'Los equipos de alta velocidad de centrifugado extraen más agua antes del secado, lo que reduce de forma directa el gasto de gas o vapor en la secadora.',
      },
    ],
    categorias: [
      'lavadoras-industriales-en-venta-lima-peru',
      'secadoras-industriales-en-venta-lima-peru',
      'calandrias-industriales-en-venta-lima-peru',
      'prensas-de-planchado-en-venta-lima-peru',
    ],
  },
  {
    slug: 'maquinas-lavadoras-para-industria-hospitalaria',
    nombre: 'Salud',
    imagen: '/img/productos/lavadora-con-barrera-sanitaria-lbs50-efamein/principal.webp',
    titulo: 'Lavandería hospitalaria y de clínicas',
    title: 'Lavadoras con Barrera Sanitaria para Hospitales y Clínicas | Efameinsa',
    description:
      'Equipos de lavandería hospitalaria con barrera sanitaria, autoclaves y secadoras industriales. Separación de zona sucia y limpia según protocolo. Lima, Perú.',
    entradilla:
      'La ropa hospitalaria exige trazabilidad y separación física entre zona contaminada y zona limpia. Nuestras lavadoras de barrera sanitaria cumplen ese protocolo por diseño.',
    dolor:
      'Sin barrera sanitaria, la ropa limpia vuelve a cruzar el área contaminada y se rompe la cadena de asepsia. Es el punto que más observan las auditorías de infecciones intrahospitalarias.',
    argumentos: [
      {
        titulo: 'Doble puerta, dos ambientes',
        texto:
          'La carga entra por la zona sucia y sale por la zona limpia. El muro sanitario impide el cruce de flujos y el equipo bloquea la apertura simultánea de ambas puertas.',
      },
      {
        titulo: 'Ciclos validables',
        texto:
          'Programas con temperatura y tiempo de termodesinfección registrables, para sustentar el cumplimiento ante auditoría.',
      },
      {
        titulo: 'Autoclaves y esterilización',
        texto:
          'Complementamos la lavandería con equipos de esterilización para el material que lo requiere, con el mismo servicio técnico.',
      },
    ],
    categorias: [
      'lavadoras-con-barreras-sanitarias-en-venta-lima-peru',
      'secadoras-industriales-en-venta-lima-peru',
      'calandrias-industriales-en-venta-lima-peru',
    ],
  },
  {
    slug: 'maquinas-lavadoras-para-industria-minera',
    nombre: 'Minería',
    imagen: '/img/productos/lavadora-industrial-uw160-unimac/principal.webp',
    titulo: 'Lavandería para campamentos mineros',
    title: 'Equipos de Lavandería Industrial para Minería y Campamentos | Efameinsa',
    description:
      'Lavadoras y secadoras industriales para campamentos mineros en Perú. Equipos robustos para ropa de trabajo con alta carga de sólidos. Servicio técnico en provincias.',
    entradilla:
      'La ropa de trabajo en mina llega con tierra, grasa y humedad, y el campamento no puede quedarse sin muda. Equipamos lavanderías que soportan ese régimen a 4.000 msnm.',
    dolor:
      'Una lavadora doméstica o comercial reventada a las pocas semanas es el escenario habitual cuando se subestima la carga abrasiva de la ropa minera.',
    argumentos: [
      {
        titulo: 'Construcción reforzada',
        texto:
          'Tambores y suspensión dimensionados para carga abrasiva continua y turnos de 24 horas, no para uso intermitente.',
      },
      {
        titulo: 'Instalación en altura y en provincia',
        texto:
          'Ajustamos la configuración de equipos y calderas a la altitud del campamento y atendemos la puesta en marcha fuera de Lima.',
      },
      {
        titulo: 'Repuestos con stock local',
        texto:
          'Mantenemos repuestos en Lima para las marcas que representamos, de modo que una parada no se convierta en semanas de espera por importación.',
      },
    ],
    categorias: [
      'lavadoras-industriales-en-venta-lima-peru',
      'secadoras-industriales-en-venta-lima-peru',
      'centrifugas-hidroextractoras-en-venta-lima-peru',
    ],
  },
  {
    slug: 'maquinas-lavadoras-para-industria-textil',
    nombre: 'Textil',
    imagen: '/img/productos/centrifuga-hidroextractora-lc100-efamein/principal.webp',
    titulo: 'Maquinaria para la industria textil',
    title: 'Lavadoras Teñidoras y Maquinaria Textil Industrial | Efameinsa',
    description:
      'Lavadoras teñidoras, centrífugas hidroextractoras, revisadoras de telas y mesas vaporizadoras para la industria textil peruana. Fabricación propia.',
    entradilla:
      'Procesos de acabado, teñido y revisión de tela con la maquinaria que exige la exportación textil peruana, incluida la que fabricamos en nuestra propia planta.',
    dolor:
      'En acabado textil, un lote mal escurrido o una tela con falla no detectada se convierte en un reclamo del cliente final y en devolución de exportación.',
    argumentos: [
      {
        titulo: 'Teñido con control de proceso',
        texto:
          'Lavadoras teñidoras con control de temperatura y tiempo para reproducir la misma tonalidad entre lotes.',
      },
      {
        titulo: 'Extracción antes del secado',
        texto:
          'Las centrífugas hidroextractoras reducen la humedad residual y acortan el paso por secadora, que es donde se va la energía.',
      },
      {
        titulo: 'Inspección de tela',
        texto:
          'Revisadoras de tela de fabricación propia, en anchos de 1.400 a 2.000 mm, para detectar fallas antes del corte.',
      },
    ],
    categorias: [
      'lavadoras-tenidoras-en-venta-lima-peru',
      'centrifugas-hidroextractoras-en-venta-lima-peru',
      'revisadoras-de-telas-en-venta-lima-peru',
      'mesas-vaporizadoras-en-venta-lima-peru',
    ],
  },
  {
    slug: 'maquinas-lavadoras-para-agroindustria',
    nombre: 'Agroindustria',
    imagen: '/img/productos/secadora-industrial-ad120i-adc/principal.webp',
    titulo: 'Lavandería para agroindustria y planta alimentaria',
    title: 'Equipos de Lavandería para Agroindustria y Plantas de Alimentos | Efameinsa',
    description:
      'Lavadoras industriales para uniformes, mandiles y EPP en plantas agroindustriales y de alimentos. Cumplimiento de inocuidad y alta rotación diaria.',
    entradilla:
      'Packing y planta de proceso mueven cientos de uniformes por turno. La lavandería interna asegura la inocuidad y evita que la ropa salga del recinto.',
    dolor:
      'Auditorías como BRC o HACCP observan el lavado de uniformes fuera de planta porque no hay control sobre el proceso ni sobre la contaminación cruzada.',
    argumentos: [
      {
        titulo: 'Volumen de campaña',
        texto:
          'Dimensionamos para el pico de campaña, no para el promedio del año, que es donde suelen quedarse cortas las instalaciones.',
      },
      {
        titulo: 'Inocuidad documentada',
        texto:
          'Ciclos con temperatura controlada y registro, útiles para sustentar el procedimiento ante auditoría de inocuidad.',
      },
      {
        titulo: 'Secado rápido para rotación por turno',
        texto:
          'Combinaciones de lavadora y secadora que devuelven el uniforme limpio dentro del mismo turno.',
      },
    ],
    categorias: [
      'lavadoras-industriales-en-venta-lima-peru',
      'secadoras-industriales-en-venta-lima-peru',
      'coches-para-ropa-en-venta-lima-peru',
    ],
  },
  {
    slug: 'maquinas-lavadoras-para-industria-comercial',
    nombre: 'Lavandería comercial',
    imagen: '/img/productos/lavadora-semi-industrial-lg-titan-max/principal.webp',
    titulo: 'Equipos para negocios de lavandería',
    title: 'Lavadoras Comerciales para Negocio de Lavandería | Efameinsa',
    description:
      'Lavadoras y secadoras comerciales, mesas de planchado y lavadoras al seco ecológicas para negocios de lavandería, autoservicio y edificios multifamiliares.',
    entradilla:
      'Para quien abre o amplía un negocio de lavandería: equipos comerciales de bajo consumo y un acompañamiento que empieza antes de la compra.',
    dolor:
      'La mayoría de lavanderías que cierran no lo hacen por falta de clientes, sino porque compraron equipo doméstico que no aguanta el uso continuo y consume de más.',
    argumentos: [
      {
        titulo: 'Retorno de inversión calculado',
        texto:
          'Antes de cotizar estimamos el punto de equilibrio del local según kilos por día, tarifa y consumo de servicios.',
      },
      {
        titulo: 'Modalidad autoservicio o atendido',
        texto:
          'Equipos con sistema a moneda para autoservicio, o sistema OPL para lavandería atendida por personal.',
      },
      {
        titulo: 'Wet cleaning en lugar de solvente',
        texto:
          'Alternativa ecológica al lavado al seco tradicional, sin perclorotileno, para prendas delicadas.',
      },
    ],
    categorias: [
      'lavadoras-comerciales-en-venta-lima-peru',
      'secadoras-comerciales-en-venta-lima-peru',
      'mesas-de-planchado-en-venta-lima-peru',
      'lavadoras-al-seco-ecologicas-en-venta-lima-peru',
      'calderines-comerciales-en-venta-lima-peru',
    ],
  },
  {
    slug: 'maquinaria-para-lavanderia-autoservicio',
    nombre: 'Autoservicio',
    imagen: '/img/productos/lavadora-comercial-giant-c-a-moneda-lg/principal.webp',
    titulo: 'Lavandería de autoservicio',
    title: 'Máquinas para Lavandería de Autoservicio a Moneda | Efameinsa',
    description:
      'Lavadoras y secadoras a moneda para lavandería de autoservicio y edificios multifamiliares en Perú. Asesoría de rentabilidad y puesta en marcha.',
    entradilla:
      'El modelo de autoservicio funciona con poco personal, pero solo si el equipo aguanta el uso intensivo y el cobro es confiable.',
    dolor:
      'En autoservicio el equipo trabaja sin supervisión: cualquier falla se traduce en máquinas fuera de servicio y clientes que no vuelven.',
    argumentos: [
      {
        titulo: 'Cobro por moneda o ficha',
        texto: 'Sistemas de cobro robustos, pensados para operación desatendida.',
      },
      {
        titulo: 'Instalación en multifamiliares',
        texto:
          'Configuraciones apilables que aprovechan el área reducida de los cuartos de lavado en edificios residenciales.',
      },
      {
        titulo: 'Mantenimiento preventivo programado',
        texto:
          'Plan de mantenimiento para que la disponibilidad de las máquinas no dependa de la avería.',
      },
    ],
    categorias: ['lavadoras-comerciales-en-venta-lima-peru', 'secadoras-comerciales-en-venta-lima-peru'],
  },
  {
    slug: 'sistema-wet-cleaning-aquatouch-girbau',
    nombre: 'Wet Cleaning',
    imagen: '/img/productos/lavadora-hs6040-girbau/principal.webp',
    titulo: 'Sistema Wet Cleaning',
    title: 'Sistema Wet Cleaning: Lavado en Húmedo sin Solventes | Efameinsa',
    description:
      'Wet cleaning: alternativa ecológica al lavado al seco con solventes, para prendas delicadas, lana y seda. Equipos y químicos especializados en Perú.',
    entradilla:
      'Lavado profesional en húmedo para prendas que antes solo podían ir al seco: sin percloroetileno, sin olor residual y sin los pasivos ambientales del solvente.',
    dolor:
      'El percloroetileno está cada vez más restringido y obliga a gestionar residuos peligrosos. El wet cleaning elimina ese problema de raíz.',
    argumentos: [
      {
        titulo: 'Sin solventes clorados',
        texto:
          'Elimina el manejo, almacenamiento y disposición de solvente, junto con la exposición del personal.',
      },
      {
        titulo: 'Cuidado de la fibra',
        texto:
          'Control fino de agitación y temperatura para lana, seda y prendas estructuradas, sin encogimiento.',
      },
      {
        titulo: 'Química específica',
        texto: 'Detergentes y acondicionadores formulados para el proceso, no adaptados del lavado convencional.',
      },
    ],
    categorias: ['lavadoras-al-seco-ecologicas-en-venta-lima-peru', 'mesas-de-planchado-en-venta-lima-peru'],
  },
];

export const buscarSector = (slug: string) => sectores.find((s) => s.slug === slug) ?? null;
