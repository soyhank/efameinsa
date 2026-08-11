import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Blog técnico. Es la pieza que hoy falta frente a la competencia (Serfac y Panamerican
 * ya publican) y la vía para posicionar consultas informativas previas a la compra.
 */
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    titulo: z.string(),
    descripcion: z.string(),
    fecha: z.coerce.date(),
    actualizado: z.coerce.date().optional(),
    autor: z.string().default('Equipo técnico Efameinsa'),
    categoria: z.enum(['Guías de compra', 'Operación', 'Mantenimiento', 'Rentabilidad', 'Normativa']),
    imagen: z.string().optional(),
    destacado: z.boolean().default(false),
    /** Categorías o sectores con los que enlazar desde el artículo */
    relacionados: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
