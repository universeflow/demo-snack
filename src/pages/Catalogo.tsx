import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { useCatalog } from "@/hooks/use-catalog"
import { ProductCard } from "@/components/catalog/product-card"
import { DownloadPdfButton } from "@/components/catalog/download-pdf-button"

export default function Catalogo() {
  const { categories, loading, usingSampleData } = useCatalog()
  const [activeSlug, setActiveSlug] = useState<string>("all")
  const [query, setQuery] = useState("")

  // Categoría activa + filtro de búsqueda
  const visibleCategories = useMemo(() => {
    const base =
      activeSlug === "all"
        ? categories
        : categories.filter((c) => c.slug === activeSlug)

    if (!query.trim()) return base

    const q = query.toLowerCase()
    return base
      .map((cat) => ({
        ...cat,
        products: cat.products.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.brand?.toLowerCase().includes(q),
        ),
      }))
      .filter((cat) => cat.products.length > 0)
  }, [categories, activeSlug, query])

  return (
    <main className="min-h-screen bg-black text-white">
      {/* ===== Header ===== */}
      <header className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-red-snack/20 via-black to-black" />
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-3 text-2xl font-black sm:text-3xl">
              <span className="text-red-snack">SNACK</span>
              <span className="text-white"> PRO</span>
            </div>
            <h1 className="text-balance text-3xl font-black tracking-tight sm:text-5xl">
              Catálogo de Productos
            </h1>
            <p className="mt-3 max-w-xl text-pretty text-sm text-white/60 sm:text-base">
              Snacks, bebidas y máquinas vending para tu empresa. Explora nuestra
              selección completa por categoría.
            </p>
          </motion.div>

          {/* Buscador + descarga PDF */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar producto o marca..."
                className="w-full rounded-xl border border-white/15 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-red-snack"
                aria-label="Buscar producto"
              />
            </div>
            <DownloadPdfButton categories={categories} disabled={loading} />
          </div>
        </div>
      </header>

      {/* ===== Tabs de categorías ===== */}
      <nav className="sticky top-0 z-20 border-b border-white/10 bg-black/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 scrollbar-none">
          <CategoryTab
            label="Todos"
            active={activeSlug === "all"}
            onClick={() => setActiveSlug("all")}
          />
          {categories.map((cat) => (
            <CategoryTab
              key={cat.slug}
              label={cat.name}
              active={activeSlug === cat.slug}
              onClick={() => setActiveSlug(cat.slug)}
            />
          ))}
        </div>
      </nav>

      {/* ===== Contenido ===== */}
      <div className="mx-auto max-w-6xl px-4 py-10">
        {usingSampleData && !loading && (
          <div className="mb-8 rounded-xl border border-red-snack/30 bg-red-snack/10 px-4 py-3 text-xs text-white/70 sm:text-sm">
            Mostrando datos de ejemplo. Conecta tu CMS Strapi (variable{" "}
            <code className="rounded bg-black/40 px-1 font-mono text-red-snack">
              VITE_STRAPI_URL
            </code>
            ) para administrar categorías y productos.
          </div>
        )}

        {loading ? (
          <SkeletonGrid />
        ) : visibleCategories.length === 0 ? (
          <p className="py-20 text-center text-white/50">
            No se encontraron productos para tu búsqueda.
          </p>
        ) : (
          <div className="flex flex-col gap-14">
            {visibleCategories.map((cat) => (
              <section key={cat.slug} id={cat.slug} className="scroll-mt-20">
                <div className="mb-5 flex items-center gap-3">
                  <h2 className="text-xl font-black sm:text-2xl">{cat.name}</h2>
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/60">
                    {cat.products.length}
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {cat.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      {/* ===== Footer simple ===== */}
      <footer className="border-t border-white/10 py-8 text-center text-xs text-white/40">
        <span className="text-red-snack">SNACK</span> PRO · Catálogo actualizado
      </footer>
    </main>
  )
}

function CategoryTab({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
        active
          ? "bg-red-snack text-white"
          : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
      }`}
    >
      {label}
    </button>
  )
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="aspect-[3/4] animate-pulse rounded-2xl border border-white/10 bg-white/5"
        />
      ))}
    </div>
  )
}
