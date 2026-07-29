import path from "node:path"
import { fileURLToPath } from "node:url"
import { renderToFile } from "@react-pdf/renderer"
import React from "react"
import { CatalogPdf } from "../src/components/catalog/catalog-pdf"
import { SAMPLE_CATALOG } from "../src/lib/strapi"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(__dirname, "..", "public")

// Reapunta las imágenes (/products/x.png) a rutas absolutas del sistema de
// archivos para que @react-pdf pueda incrustarlas al renderizar en Node.
const categories = SAMPLE_CATALOG.map((cat) => ({
  ...cat,
  products: cat.products.map((p) => ({
    ...p,
    imageUrl: p.imageUrl
      ? path.join(publicDir, p.imageUrl.replace(/^\//, ""))
      : undefined,
  })),
}))

const outPath = path.join(publicDir, "catalogo-snackpro.pdf")

await renderToFile(
  React.createElement(CatalogPdf, { categories }),
  outPath,
)

console.log("[v0] PDF generado en:", outPath)
