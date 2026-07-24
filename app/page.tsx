import { Navigation } from "@/components/navigation"
import VendingMachineBanner from "@/components/vending-machine-banner"
import NuestrosClientes from "@/components/nuestros-clientes"
import { Nosotros } from "@/components/nosotros"
import { Servicios } from "@/components/servicios"
import { BentoGrid } from "@/components/bento-grid"
import { ActivationsSection } from "@/components/activations-section"
import { SocialSection } from "@/components/social-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="bg-black overflow-hidden">
      <Navigation />
      <section className="h-screen bg-black flex items-center justify-center px-4 py-0">
        <VendingMachineBanner />
      </section>
      <div className="py-12">
        <NuestrosClientes />
      </div>
      <div className="py-12">
        <Nosotros />
      </div>
      <div className="py-12">
        <Servicios />
      </div>
      <div className="py-12">
        <BentoGrid />
      </div>
      <div className="py-12">
        <ActivationsSection />
      </div>
      <div className="py-12">
        <SocialSection />
      </div>
      <Footer />
    </main>
  )
}
