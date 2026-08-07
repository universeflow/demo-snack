"use client"

import React, { useEffect, useState } from "react"
import Navigation from "@/components/navigation"
import VendingMachineBanner from "@/components/vending-machine-banner"
import NuestrosClientes from "@/components/nuestros-clientes"
import Nosotros from "@/components/nosotros"
import Servicios from "@/components/servicios"
import Catalogo from "@/components/catalogo"
import Contacto from "@/components/contacto"
import Footer from "@/components/footer"

import { WhatsAppButton } from "@/components/whatsapp-button"
export default function HomePage() {
  const [activeSection, setActiveSection] = useState<string>("inicio")

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.replace("#", "") : ""
    setActiveSection(hash === "nosotros" || hash === "servicios" || hash === "catalogo" || hash === "contacto" ? hash : "inicio")
    const onPop = () => {
      const h = window.location.hash.replace("#", "") || "inicio"
      setActiveSection(h)
    }
    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [])

  const handleNavigate = (id: string) => setActiveSection(id)

  return (
    <>
      <main className="min-h-screen bg-transparent overflow-hidden">
        <Navigation activeSection={activeSection} onNavigate={handleNavigate} />

        {/* Inicio */}
        {activeSection === "inicio" && (
          <section id="inicio" className="bg-transparent pt-20">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <VendingMachineBanner />
            </div>
            <div className="max-w-7xl mx-auto px-4 py-4">
              <NuestrosClientes />
            </div>
          </section>
        )}

        {activeSection === "nosotros" && (
          <div id="nosotros" className="max-w-7xl mx-auto px-4 pt-24 pb-8">
            <Nosotros />
          </div>
        )}

        {activeSection === "servicios" && (
          <div id="servicios" className="max-w-7xl mx-auto px-4 pt-24 pb-8">
            <Servicios />
          </div>
        )}

        {activeSection === "catalogo" && (
          <div id="catalogo" className="max-w-7xl mx-auto px-4 pt-24 pb-8">
            <Catalogo />
          </div>
        )}

        {activeSection === "contacto" && (
          <div id="contacto" className="max-w-7xl mx-auto px-4 pt-24 pb-8">
            <Contacto />
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 py-4">
          <Footer />
        </div>
      </main>
      <WhatsAppButton />
    </>
  )
}
