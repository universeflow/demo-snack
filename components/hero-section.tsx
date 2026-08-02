import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Carousel from "./carousel"
import { getCarruselSnackPro } from "../src/lib/get-carrusel-content"

const NODES = [
  { x: 2, y: 5 }, { x: 8, y: 15 }, { x: 15, y: 8 }, { x: 22, y: 20 },
  { x: 5, y: 35 }, { x: 12, y: 45 }, { x: 20, y: 38 }, { x: 28, y: 25 },
  { x: 35, y: 12 }, { x: 42, y: 30 }, { x: 48, y: 18 }, { x: 3, y: 60 },
  { x: 10, y: 70 }, { x: 18, y: 58 }, { x: 25, y: 72 }, { x: 32, y: 50 },
  { x: 40, y: 65 }, { x: 48, y: 80 }, { x: 55, y: 10 }, { x: 62, y: 28 },
  { x: 70, y: 15 }, { x: 78, y: 5 }, { x: 85, y: 22 }, { x: 92, y: 12 },
  { x: 98, y: 30 }, { x: 68, y: 45 }, { x: 75, y: 60 }, { x: 82, y: 75 },
  { x: 90, y: 55 }, { x: 96, y: 70 }, { x: 60, y: 78 }, { x: 55, y: 95 },
  { x: 45, y: 88 }, { x: 38, y: 95 }, { x: 25, y: 88 }, { x: 15, y: 95 },
  { x: 5, y: 82 }, { x: 72, y: 90 }, { x: 88, y: 92 }, { x: 50, y: 55 },
]

const EDGES: [number, number][] = [
  [0,1],[1,2],[2,3],[0,4],[1,4],[4,5],[5,6],[6,7],[7,3],[3,8],
  [8,9],[9,10],[2,8],[6,9],[10,18],[18,19],[19,20],[20,21],[21,22],
  [22,23],[23,24],[19,25],[25,26],[26,27],[27,28],[28,29],[29,24],
  [25,9],[11,12],[12,13],[13,14],[14,15],[15,16],[16,17],[11,4],
  [12,5],[13,6],[14,7],[15,9],[16,25],[17,26],[30,31],[31,32],
  [32,33],[33,34],[34,35],[35,36],[36,11],[37,27],[38,29],[37,38],
  [37,30],[38,29],[39,25],[39,15],
]

const DEFAULT_HERO_SLIDES = [
  { src: "/images/slide1.jpg", title: "ELIGE", subtitle: "Encuentra tu opción", accentColor: "var(--accent, #E51B24)", objectPosition: "center" },
  { src: "/images/slide2.jpg", title: "PRESIONA", subtitle: "Servicio rápido", accentColor: "var(--accent, #E51B24)", objectPosition: "center" },
  { src: "/images/slide3.jpg", title: "DISFRUTA", subtitle: "Calidad al instante", accentColor: "var(--accent, #E51B24)", objectPosition: "center" }
]

export function HeroSection() {
  const [slides, setSlides] = useState<any[]>(DEFAULT_HERO_SLIDES)

  useEffect(() => {
    let mounted = true
    async function fetchSlides() {
      try {
        const data = await getCarruselSnackPro()
        if (mounted && data && data.length > 0) {
          setSlides(
            data.map((item) => ({
              src: item.url || "/images/slide1.jpg",
              title: item.titulo_blanco ?? "",
              subtitle: item.titulo_rojo ?? "",
              accentColor: "var(--accent, #E51B24)",
              objectPosition: "center",
            }))
          )
        }
      } catch (err) {
        console.error("Error obteniendo carrusel en HeroSection:", err)
      }
    }
    fetchSlides()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <section id="hero" className="relative w-full min-h-screen text-white overflow-hidden pt-20">
      {/* Left Background Pattern - Bottom Left Corner */}
      <div className="absolute bottom-0 left-0 w-80 h-80 opacity-30 -rotate-12 pointer-events-none">
        <img src="/images/izquierda.png" alt="Left pattern" className="w-full h-full object-cover" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-3xl space-y-10">
        {/* Main Titles */}
        {/* ...existing code (títulos y textos) ... */}
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 py-20">
        {/* Carousel row: centered, full-width up to max-w-7xl */}
        <div className="w-full flex justify-center mb-8">
          <div className="w-full max-w-7xl mx-auto">
            <Carousel
              slides={slides}
              height={"min(80vh, 820px)"}
              intervalMs={3000}
            />
          </div>
        </div>

        {/* grid content (maquina u otros) */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* RIGHT: ...existing code... */}
          {/* ...existing code... */}
        </div>
      </div>
    </section>
  )
}
