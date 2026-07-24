import { Navigation } from "@/components/navigation"
import VendingMachineBanner from "@/components/vending-machine-banner"
import NuestrosClientes from "@/components/nuestros-clientes"
import { BentoGrid } from "@/components/bento-grid"
import { ActivationsSection } from "@/components/activations-section"
import { SocialSection } from "@/components/social-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="bg-black">
      <Navigation />
      <section className="h-screen bg-black flex items-center justify-center px-4 py-0">
        <VendingMachineBanner />
      </section>
      <div className="h-screen bg-black">
        <NuestrosClientes />
      </div>
      <div className="h-screen bg-white">
        <BentoGrid />
      </div>
      <div className="h-screen bg-black">
        <ActivationsSection />
      </div>
      <div className="h-screen bg-black">
        <SocialSection />
      </div>
      <Footer />
    </main>
  )
}
