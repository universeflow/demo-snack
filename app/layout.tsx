import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LenisProvider } from "@/components/lenis-provider"
import ClickSpark from "@/components/click-spark"
import "./globals.css"

const _inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const _jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "SNACK PRO | Máquinas Dispensadoras Automáticas - Soluciones de Snacks",
  description: "SNACK PRO ofrece máquinas dispensadoras automáticas de alta calidad para empresas. Soluciones innovadoras en dispensación de snacks y bebidas con gestión remota.",
  keywords: [
    "máquina dispensadora",
    "máquina snacks",
    "vending machine",
    "dispensador automático",
    "snack pro",
    "máquina expendedora",
    "máquinas dispensadoras Chile",
    "soluciones de snacks para empresas",
    "máquina de snacks y bebidas",
  ],
  generator: "SNACK PRO",
  applicationName: "SNACK PRO",
  authors: [{ name: "Aenima Soluciones", url: "https://www.aenimasoluciones.cl" }],
  creator: "Aenima Soluciones",
  publisher: "SNACK PRO",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://www.snackpro.cl",
    siteName: "SNACK PRO",
    title: "SNACK PRO | Máquinas Dispensadoras Automáticas",
    description: "Soluciones innovadoras en dispensación automática de snacks y bebidas para empresas.",
    images: [
      {
        url: "https://www.snackpro.cl/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SNACK PRO - Máquinas Dispensadoras",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SNACK PRO | Máquinas Dispensadoras Automáticas",
    description: "Soluciones innovadoras en dispensación automática de snacks y bebidas",
    images: ["https://www.snackpro.cl/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.snackpro.cl",
  },
  verification: {
    google: "google-site-verification-code",
  },
}

export const viewport: Viewport = {
  themeColor: "#E51B24",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SNACK PRO",
              "url": "https://www.snackpro.cl",
              "logo": "https://www.snackpro.cl/logo.png",
              "description": "SNACK PRO ofrece máquinas dispensadoras automáticas de alta calidad para empresas",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Customer Support",
                "telephone": "+56912345678",
                "email": "contacto@snackpro.cl"
              },
              "sameAs": [
                "https://www.facebook.com/snackpro",
                "https://www.instagram.com/snackpro",
                "https://www.linkedin.com/company/snackpro"
              ]
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
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
        <Analytics />
      </body>
    </html>
  )
}
