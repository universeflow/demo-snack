import { Navigation } from "@/components/navigation"
import VendingMachineBanner from "@/components/vending-machine-banner"
import NuestrosClientes from "@/components/nuestros-clientes"
import { BentoGrid } from "@/components/bento-grid"
import { ActivationsSection } from "@/components/activations-section"
import { SocialSection } from "@/components/social-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navigation />
      <section className="min-h-screen bg-black flex items-center justify-center p-4">
        <VendingMachineBanner />
      </section>
      <NuestrosClientes />
      <BentoGrid />
      <ActivationsSection />
      <SocialSection />
      <Footer />
    </main>
  )
}
