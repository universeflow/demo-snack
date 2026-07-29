import { motion } from "framer-motion"
import type { Product } from "@/lib/strapi"

function formatPrice(price?: number) {
  if (typeof price !== "number") return null
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(price)
}

export function ProductCard({ product }: { product: Product }) {
  const price = formatPrice(product.price)

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-neutral-900 to-black transition-colors hover:border-red-snack/60"
    >
      {/* Imagen / placeholder */}
      <div className="relative aspect-square w-full overflow-hidden bg-neutral-950">
        {product.imageUrl ? (
          <img
            src={product.imageUrl || "/placeholder.svg"}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            {/* Placeholder con estilo SNACK PRO */}
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="text-5xl font-black text-red-snack/80">
                {product.name.charAt(0).toUpperCase()}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-white/30">
                Imagen próximamente
              </span>
            </div>
          </div>
        )}

        {product.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-red-snack px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            Destacado
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1 p-4">
        {product.brand && (
          <span className="text-[11px] font-semibold uppercase tracking-wider text-red-snack">
            {product.brand}
          </span>
        )}
        <h3 className="text-pretty text-sm font-bold leading-tight text-white sm:text-base">
          {product.name}
        </h3>
        {product.description && (
          <p className="line-clamp-2 text-xs leading-relaxed text-white/50">
            {product.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-3">
          {product.format && (
            <span className="rounded-md border border-white/10 px-2 py-1 text-[11px] font-medium text-white/60">
              {product.format}
            </span>
          )}
          {price && <span className="text-sm font-black text-white">{price}</span>}
        </div>
      </div>
    </motion.article>
  )
}
