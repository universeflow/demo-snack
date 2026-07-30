import React from "react"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import NuestrosClientes from "@/components/nuestros-clientes"
import { Servicios } from "@/components/servicios"
import { Nosotros } from "@/components/nosotros"
import { Contacto } from "@/components/contacto"
import { Footer } from "@/components/footer"

export default function App() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <NuestrosClientes />
      <Servicios />
      <Nosotros />
      <Contacto />
      <Footer />
    </main>
  )
}
