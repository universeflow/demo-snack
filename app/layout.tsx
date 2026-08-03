import React from "react"
import { LenisProvider } from "@/components/lenis-provider"
import ClickSpark from "@/components/click-spark"
import "../src/styles/globals.css"

// Nota: este layout ya no usa APIs de Next.
// Mantengo un wrapper React neutral por compatibilidad/archivo.
// Puedes borrar la carpeta `app/` manualmente cuando verifiques que todo funciona.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="font-sans antialiased bg-black text-white">
        <ClickSpark
          sparkColor="#AFFF00"
          sparkSize={12}
          sparkRadius={20}
          sparkCount={8}
          duration={400}
          easing="ease-out"
        >
          <LenisProvider>{children}</LenisProvider>
        </ClickSpark>
       
      </body>
    </html>
  )
}
