// ============================================================================
// SNACK PRO - Cliente de Strapi (CMS headless)
// ----------------------------------------------------------------------------
// Este archivo define los tipos del catálogo y la capa de acceso a datos.
// El catálogo se alimenta dinámicamente desde Strapi. Si Strapi no está
// configurado (o falla la conexión), se usan datos de ejemplo para que la
// página se vea igual en el preview.
//
// Para conectar tu Strapi, define la variable de entorno en un archivo .env:
//   VITE_STRAPI_URL=https://tu-strapi.tudominio.com
//
// Estructura esperada en Strapi (Content-Types):
//   - Category (Colección): name (Text), slug (UID), order (Number)
//   - Product  (Colección): name (Text), slug (UID), description (Text),
//                           format (Text), price (Number), featured (Boolean),
//                           brand (Text), image (Media, single),
//                           category (Relation -> Category)
// ============================================================================

export interface Product {
  id: string | number
  name: string
  slug: string
  description?: string
  /** Formato / contenido, ej: "45g", "500ml", "Pack x6" */
  format?: string
  price?: number
  brand?: string
  featured?: boolean
  imageUrl?: string
}

export interface Category {
  id: string | number
  name: string
  slug: string
  order: number
  products: Product[]
}

const STRAPI_URL = (import.meta.env.VITE_STRAPI_URL as string | undefined)?.replace(/\/$/, "")

/** Convierte una URL de media de Strapi (que puede ser relativa) en absoluta. */
function resolveMediaUrl(url?: string): string | undefined {
  if (!url) return undefined
  if (url.startsWith("http")) return url
  return STRAPI_URL ? `${STRAPI_URL}${url}` : url
}

/** Normaliza la respuesta de Strapi v4 a nuestros tipos internos. */
function normalizeStrapiResponse(json: any): Category[] {
  const categories: Category[] = (json?.data ?? []).map((cat: any) => {
    const attr = cat.attributes ?? cat
    const productsRaw = attr.products?.data ?? attr.products ?? []
    const products: Product[] = productsRaw.map((p: any) => {
      const pa = p.attributes ?? p
      const imgUrl =
        pa.image?.data?.attributes?.url ?? pa.image?.url ?? pa.imageUrl
      return {
        id: p.id ?? pa.id,
        name: pa.name,
        slug: pa.slug ?? String(pa.name).toLowerCase().replace(/\s+/g, "-"),
        description: pa.description,
        format: pa.format,
        price: pa.price,
        brand: pa.brand,
        featured: pa.featured ?? false,
        imageUrl: resolveMediaUrl(imgUrl),
      }
    })
    return {
      id: cat.id ?? attr.id,
      name: attr.name,
      slug: attr.slug ?? String(attr.name).toLowerCase().replace(/\s+/g, "-"),
      order: attr.order ?? 0,
      products,
    }
  })
  return categories.sort((a, b) => a.order - b.order)
}

/**
 * Obtiene el catálogo completo (categorías + productos) desde Strapi.
 * Lanza un error si Strapi no está configurado o la petición falla,
 * para que el hook decida usar los datos de ejemplo.
 */
export async function fetchCatalog(): Promise<Category[]> {
  if (!STRAPI_URL) {
    throw new Error("VITE_STRAPI_URL no está configurada")
  }
  // populate=* trae la imagen y la relación de productos anidada
  const endpoint = `${STRAPI_URL}/api/categories?populate[products][populate]=image&sort=order:asc`
  const res = await fetch(endpoint)
  if (!res.ok) {
    throw new Error(`Error de Strapi: ${res.status}`)
  }
  const json = await res.json()
  return normalizeStrapiResponse(json)
}

// ============================================================================
// Datos de ejemplo (fallback) — basados en el Catálogo SNACK Octubre 2025.
// Se muestran cuando Strapi todavía no está conectado.
// ============================================================================

export const SAMPLE_CATALOG: Category[] = [
  {
    id: "snacks",
    name: "Snacks",
    slug: "snacks",
    order: 1,
    products: [
      { id: "s1", name: "Lay's Original", slug: "lays-original", format: "45g", brand: "Lay's", featured: true },
      { id: "s2", name: "Doritos Queso", slug: "doritos-queso", format: "48g", brand: "Doritos" },
      { id: "s3", name: "Cheetos", slug: "cheetos", format: "32g", brand: "Cheetos" },
      { id: "s4", name: "Detodito", slug: "detodito", format: "45g", brand: "Detodito" },
      { id: "s5", name: "Quaker Barra Avena", slug: "quaker-barra", format: "35g", brand: "Quaker" },
      { id: "s6", name: "Galleta Costa", slug: "galleta-costa", format: "80g", brand: "Costa" },
    ],
  },
  {
    id: "bebidas",
    name: "Bebidas",
    slug: "bebidas",
    order: 2,
    products: [
      { id: "b1", name: "Coca Cola", slug: "coca-cola", format: "350ml", brand: "Coca Cola", featured: true },
      { id: "b2", name: "Jugo Andina", slug: "jugo-andina", format: "300ml", brand: "Andina" },
      { id: "b3", name: "Agua Cachantún", slug: "agua-cachantun", format: "500ml", brand: "Cachantún" },
      { id: "b4", name: "Power Ade", slug: "power-ade", format: "500ml", brand: "Power Ade" },
    ],
  },
  {
    id: "importados",
    name: "Importados",
    slug: "importados",
    order: 3,
    products: [
      { id: "i1", name: "Gusto Croissant", slug: "gusto-croissant", format: "50g", brand: "Gusto" },
      { id: "i2", name: "Arrivo", slug: "arrivo", format: "60g", brand: "Arrivo" },
      { id: "i3", name: "Serenata", slug: "serenata", format: "40g", brand: "Serenata" },
      { id: "i4", name: "4x4", slug: "4x4", format: "45g", brand: "4x4" },
    ],
  },
  {
    id: "marcas-propias",
    name: "Marcas Propias",
    slug: "marcas-propias",
    order: 4,
    products: [
      { id: "m1", name: "+Energy", slug: "energy", format: "500ml", brand: "SNACK PRO", featured: true },
      { id: "m2", name: "Golden Juice", slug: "golden-juice", format: "300ml", brand: "SNACK PRO" },
      { id: "m3", name: "Golden Aloe", slug: "golden-aloe", format: "500ml", brand: "SNACK PRO" },
      { id: "m4", name: "Golden Drinks", slug: "golden-drinks", format: "350ml", brand: "SNACK PRO" },
    ],
  },
  {
    id: "maquinas",
    name: "Máquinas Vending",
    slug: "maquinas-vending",
    order: 5,
    products: [
      { id: "v1", name: "Máquina Snack + Refresco", slug: "maquina-snack-refresco", format: "Combinada", featured: true },
      { id: "v2", name: "Máquina Refresco", slug: "maquina-refresco", format: "Bebidas" },
      { id: "v3", name: "Máquina Café", slug: "maquina-cafe", format: "Café caliente" },
    ],
  },
]
