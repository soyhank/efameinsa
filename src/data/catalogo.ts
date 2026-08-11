import datos from './catalogo.json';
import paginasJson from './paginas.json';

export type Spec = { k: string; v: string };
export type Caracteristica = { titulo: string; texto: string; imagen: string | null; imagenLocal: string | null };

export type Producto = {
  slug: string;
  nombre: string;
  categoria: string;
  linea: 'industrial' | 'comercial';
  title: string;
  description: string;
  marca: string;
  modelo: string;
  descripcionLarga: string;
  caracteristicas: Caracteristica[];
  imagenLocal: string | null;
  galeriaLocal: string[];
  specs: Spec[];
};

export type Categoria = {
  slug: string;
  linea: 'industrial' | 'comercial';
  title: string;
  description: string;
  h1: string;
  intro: string;
  productos: string[];
};

export const productos = datos.productos as unknown as Producto[];
export const categorias = datos.categorias as unknown as Categoria[];

export const paginas = paginasJson as unknown as {
  slug: string;
  tipo: string;
  url: string;
  title: string;
  description: string;
  keywords: string;
  encabezados: { nivel: number; texto: string }[];
  parrafos: string[];
}[];

const porSlug = new Map(productos.map((p) => [p.slug, p]));
const categoriaPorSlug = new Map(categorias.map((c) => [c.slug, c]));

export const buscarProducto = (slug: string) => porSlug.get(slug) ?? null;
export const buscarCategoria = (slug: string) => categoriaPorSlug.get(slug) ?? null;

/** Productos de una categoría, en el orden en que los lista el catálogo original. */
export function productosDe(slugCategoria: string): Producto[] {
  const cat = categoriaPorSlug.get(slugCategoria);
  if (!cat) return [];
  return cat.productos.map((s) => porSlug.get(s)).filter((p): p is Producto => Boolean(p));
}

/** Capacidad en kg, leída de las especificaciones, para ordenar y filtrar por tamaño. */
export function capacidadKg(p: Producto): number | null {
  const spec = p.specs.find((s) => /capacidad/i.test(s.k));
  if (!spec) return null;
  const m = spec.v.match(/([\d.,]+)\s*kg/i);
  if (!m) return null;
  const n = parseFloat(m[1].replace(',', '.'));
  return Number.isFinite(n) ? n : null;
}

export const marcas = [...new Set(productos.map((p) => p.marca).filter(Boolean))].sort();

export function productosDeMarca(marca: string) {
  return productos.filter((p) => p.marca.toLowerCase() === marca.toLowerCase());
}

export const slugMarca = (m: string) =>
  m
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const marcasConSlug = marcas.map((m) => ({ nombre: m, slug: slugMarca(m), total: productosDeMarca(m).length }));

export const lineas = {
  industrial: categorias.filter((c) => c.linea === 'industrial'),
  comercial: categorias.filter((c) => c.linea === 'comercial'),
};
