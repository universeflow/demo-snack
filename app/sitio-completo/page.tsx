import { Navigation } from "@/components/navigation"
import VendingMachineBanner from "@/components/vending-machine-banner"
import NuestrosClientes from "@/components/nuestros-clientes"
import { Nosotros } from "@/components/nosotros"
import { Servicios } from "@/components/servicios"
import { Contacto } from "@/components/contacto"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="bg-black overflow-hidden">
      <Navigation />
      <section id="hero" className="h-screen bg-black flex items-center justify-center px-4 py-0">
        <VendingMachineBanner />
      </section>
      <div id="clientes" className="py-12 scroll-section">
        <NuestrosClientes />
      </div>
      <div id="nosotros" className="py-12 scroll-section">
        <Nosotros />
      </div>
      <div id="servicios" className="py-12 scroll-section">
        <Servicios />
      </div>
      <div id="contacto" className="py-12 scroll-section">
        <Contacto />
      </div>
      <Footer />
    </main>
  )
}
