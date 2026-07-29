import { useEffect, useState } from "react"
import { fetchCatalog, SAMPLE_CATALOG, type Category } from "@/lib/strapi"

interface CatalogState {
  categories: Category[]
  loading: boolean
  /** true cuando se están mostrando los datos de ejemplo (Strapi no conectado) */
  usingSampleData: boolean
}

/**
 * Carga el catálogo desde Strapi. Si Strapi no está configurado o falla,
 * cae de forma transparente a los datos de ejemplo para que la página
 * siempre tenga contenido que mostrar.
 */
export function useCatalog(): CatalogState {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [usingSampleData, setUsingSampleData] = useState(false)

  useEffect(() => {
    let active = true

    fetchCatalog()
      .then((data) => {
        if (!active) return
        // Si Strapi responde vacío, usamos el ejemplo igual
        if (!data || data.length === 0) {
          setCategories(SAMPLE_CATALOG)
          setUsingSampleData(true)
        } else {
          setCategories(data)
          setUsingSampleData(false)
        }
      })
      .catch(() => {
        if (!active) return
        setCategories(SAMPLE_CATALOG)
        setUsingSampleData(true)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return { categories, loading, usingSampleData }
}
