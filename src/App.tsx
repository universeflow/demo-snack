import React, { useEffect, useState } from "react"
import Navigation from "@/components/navigation"
import VendingMachineBanner from "@/components/vending-machine-banner"
import NuestrosClientes from "@/components/nuestros-clientes"
import Nosotros from "@/components/nosotros"
import Servicios from "@/components/servicios"
import Contacto from "@/components/contacto"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("inicio")

  useEffect(() => {
    // read hash on load to set section
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "")
      if (hash === "nosotros" || hash === "servicios" || hash === "contacto" || hash === "inicio") {
        setActiveSection(hash || "inicio")
      } else {
        setActiveSection("inicio")
      }
      const onPop = () => {
        const h = window.location.hash.replace("#", "") || "inicio"
        setActiveSection(h)
      }
      window.addEventListener("popstate", onPop)
      return () => window.removeEventListener("popstate", onPop)
    }
  }, [])

  const handleNavigate = (id: string) => setActiveSection(id)

  return (
    <>
      <main className="min-h-screen bg-transparent overflow-hidden">
      <Navigation activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Inicio: hero + nuestros clientes */}
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

      {/* Servicios */}
      {activeSection === "servicios" && (
        <div id="servicios" className="max-w-7xl mx-auto px-4 pt-24 pb-8">
          <Servicios />
        </div>
      )}

      {/* Nosotros */}
      {activeSection === "nosotros" && (
        <div id="nosotros" className="max-w-7xl mx-auto px-4 pt-24 pb-8">
          <Nosotros />
        </div>
      )}

      {/* Contacto */}
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
