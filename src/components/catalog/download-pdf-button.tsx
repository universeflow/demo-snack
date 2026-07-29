import { useState } from "react"
import { Download, Loader2 } from "lucide-react"
import type { Category } from "@/lib/strapi"

interface Props {
  categories: Category[]
  disabled?: boolean
}

export function DownloadPdfButton({ categories, disabled }: Props) {
  const [generating, setGenerating] = useState(false)

  async function handleDownload() {
    if (generating || !categories.length) return
    setGenerating(true)
    try {
      // Carga diferida: la librería PDF solo se descarga cuando se usa
      const [{ pdf }, { CatalogPdf }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./catalog-pdf"),
      ])

      const blob = await pdf(<CatalogPdf categories={categories} />).toBlob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `catalogo-snack-pro-${new Date()
        .toISOString()
        .slice(0, 7)}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error("[v0] Error generando PDF:", err)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={disabled || generating}
      className="inline-flex items-center gap-2 rounded-xl bg-red-snack px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {generating ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Generando PDF...
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          Descargar catálogo PDF
        </>
      )}
    </button>
  )
}
