/** Datos únicos de la empresa. Cambiar aquí se propaga a cabecera, pie, schema.org y formularios. */
export const EMPRESA = {
  nombre: 'Efameinsa S.A.',
  nombreCorto: 'EFAMEINSA',
  razonSocial: 'Efameinsa S.A.',
  descripcion:
    'Fabricante y distribuidor de equipos de lavandería industrial y comercial en Perú. Más de 22 años equipando hoteles, clínicas, minería, textil y agroindustria.',
  fundacion: 2002,
  anios: new Date().getFullYear() - 2002,
  certificaciones: ['ISO 9001', 'ISO 14001'],
  direccion: {
    calle: 'Av. Los Cisnes Mz. H2 Lt. 18, Urb. Club de Huachipa',
    distrito: 'Lurigancho-Chosica',
    ciudad: 'Lima',
    region: 'Lima',
    pais: 'PE',
    codigoPostal: '15461',
  },
  telefonos: ['(01) 371-0006', '(01) 371-0502'],
  celular: '+51 923 421 229',
  whatsapp: '51923421229',
  email: 'central@efameinsa.com',
  horario: 'Lunes a viernes de 8:00 a 18:00 · Sábados de 8:00 a 12:00',
  redes: {
    facebook: 'https://www.facebook.com/Efameinsa.sa/',
    linkedin: 'https://www.linkedin.com/company/efameinsa',
    youtube: 'https://www.youtube.com/channel/UCpL5Gc5uHM4l0MnfbiEHx_w/',
  },
} as const;

export const SITE_URL = 'https://www.efameinsa.com';

/** Mensaje precargado del botón de WhatsApp. */
export function enlaceWhatsApp(contexto?: string) {
  const texto = contexto
    ? `Hola, estoy interesado en ${contexto}. ¿Me pueden enviar una cotización?`
    : 'Hola, quisiera cotizar equipos de lavandería industrial.';
  return `https://wa.me/${EMPRESA.whatsapp}?text=${encodeURIComponent(texto)}`;
}
