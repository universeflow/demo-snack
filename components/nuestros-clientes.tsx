import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { parseClientsFromStrapi, Client } from './data'
import Numpad from './numpad'
import { motion } from "framer-motion"
import { InformacionClientesPayload, getClientesSnackPro } from '../src/lib/get-clientes-content'

const AUTOPLAY_MS = 5000

// URL base de Strapi dinámica
const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'

function GeometricPattern({ opacity = 0.06 }: { opacity?: number }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <defs>
        <pattern id="geo" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="30" r="1" fill="#E51B24" />
          <line x1="0" y1="0" x2="60" y2="60" stroke="#E51B24" strokeWidth="0.4" />
          <line x1="60" y1="0" x2="0" y2="60" stroke="#E51B24" strokeWidth="0.2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#geo)" />
    </svg>
  )
}

interface HeroSectionProps {
  slides?: InformacionClientesPayload[]
}

export default function NuestrosClientes({ slides: strapiSlides }: HeroSectionProps) {
  const [clients, setClients] = useState<Client[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)

  const totalClients = clients.length

  // Helper para obtener la URL de la imagen
  const getImageUrl = (client: Client | undefined): string | undefined => {
    if (!client?.imagenCliente) return undefined

    const img = client.imagenCliente
    let rawUrl: string | undefined

    // Si es string directo
    if (typeof img === 'string') {
      rawUrl = img
    } 
    // Si es objeto con propiedad url
    else if (img && typeof img === 'object' && 'url' in img) {
      rawUrl = img.url
    }

    if (!rawUrl) return undefined

    // Si ya es URL completa, retornar
    if (rawUrl.startsWith('http')) return rawUrl

    // Agregar prefijo de Strapi
    return `${STRAPI_BASE_URL}${rawUrl.startsWith('/') ? rawUrl : '/' + rawUrl}`
  }

  // Cargar clientes de Strapi
  useEffect(() => {
    let mounted = true

    async function loadClients() {
      try {
        const resp = await getClientesSnackPro()
        if (!mounted) return

        const parsedClients = parseClientsFromStrapi(resp)
        
        if (parsedClients.length > 0) {
          setClients(parsedClients)
        }
      } catch (err) {
        console.error('Error fetching clients from Strapi:', err)
      }
    }

    if (strapiSlides && strapiSlides.length > 0) {
      const parsedClients = parseClientsFromStrapi({ data: strapiSlides })
      setClients(parsedClients)
    } else {
      loadClients()
    }

    return () => { mounted = false }
  }, [strapiSlides])

  // Autoplay
  useEffect(() => {
    if (!isAutoplay || totalClients === 0) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalClients)
    }, AUTOPLAY_MS)
    return () => clearInterval(interval)
  }, [isAutoplay, totalClients])

  const goToSlide = (index: number) => {
    if (totalClients === 0) return
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    if (totalClients === 0) return
    goToSlide(currentSlide === 0 ? totalClients - 1 : currentSlide - 1)
  }

  const goToNext = () => {
    if (totalClients === 0) return
    goToSlide((currentSlide + 1) % totalClients)
  }

  // Índices para carrusel circular
  const leftIndex = totalClients > 0 ? (currentSlide - 1 + totalClients) % totalClients : 0
  const rightIndex = totalClients > 0 ? (currentSlide + 1) % totalClients : 0

  const leftClient = clients[leftIndex]
  const currentClient = clients[currentSlide]
  const rightClient = clients[rightIndex]

  return (
    <section
      ref={sectionRef}
      id="clientes"
      className="w-full flex items-center justify-center px-4 py-16 bg-transparent"
      aria-roledescription="carrusel"
      aria-label="Nuestros clientes"
    >
      <motion.div
        className="relative w-full rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden mx-auto px-2 sm:px-4 border-2 border-red-600/70 max-w-[1600px]"
        animate={{
          boxShadow: [
            "0 0 12px rgba(229,27,36,0.25), inset 0 0 8px rgba(229,27,36,0.15)",
            "0 0 28px rgba(229,27,36,0.65), inset 0 0 16px rgba(229,27,36,0.35)",
            "0 0 12px rgba(229,27,36,0.25), inset 0 0 8px rgba(229,27,36,0.15)",
          ],
          borderColor: [
            "rgba(229,27,36,0.45)",
            "rgba(229,27,36,0.85)",
            "rgba(229,27,36,0.45)",
          ]
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: 'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 30%, #111 70%, #1e1e1e 100%)',
          padding: '3px sm:4px md:6px',
          maxWidth: '100%',
          minHeight: '600px',
        }}
      >
        {/* Esquinas LED */}
        <motion.div
          className="absolute top-2 left-2 w-2 h-2 rounded-full bg-red-500 z-30"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ boxShadow: "0 0 8px #E51B24" }}
        />
        <motion.div
          className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 z-30"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
          style={{ boxShadow: "0 0 8px #E51B24" }}
        />
        <motion.div
          className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-red-500 z-30"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.45 }}
          style={{ boxShadow: "0 0 8px #E51B24" }}
        />
        <motion.div
          className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-red-500 z-30"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1.35 }}
          style={{ boxShadow: "0 0 8px #E51B24" }}
        />

        <div
          className="relative rounded-2xl overflow-hidden flex flex-col lg:flex-row w-full"
          style={{
            background: '#121212',
            height: '100%',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.8)',
          }}
        >
          <GeometricPattern opacity={0.05} />

          {/* Área principal */}
          <div className="flex-1 flex flex-col items-center justify-between py-12 px-6 relative z-10">
            {/* Header */}
            <div className="text-center mb-8 w-full">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="h-px w-16 md:w-28" style={{ background: 'linear-gradient(90deg, transparent, #E51B24)' }} />
                <h2
                  className="font-black uppercase tracking-wider text-white"
                  style={{ fontSize: 'clamp(28px, 5vw, 56px)', letterSpacing: '0.08em', textShadow: '0 0 30px rgba(229,27,36,0.3)' }}
                >
                  NUESTROS CLIENTES
                </h2>
                <div className="h-px w-16 md:w-28" style={{ background: 'linear-gradient(90deg, #E51B24, transparent)' }} />
              </div>
              <p
                className="uppercase tracking-widest font-medium"
                style={{ fontSize: 'clamp(10px, 1.4vw, 16px)', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.22em' }}
              >
                MÁS QUE LOGOS, HISTORIAS DISPENSADAS
              </p>
            </div>

            {/* Carrusel */}
            <div
              className="flex items-center justify-center gap-4 md:gap-10 w-full overflow-hidden py-8"
              role="region"
              aria-label="Testimonios de clientes"
            >
              {/* Botón anterior */}
              <button
                onClick={goToPrevious}
                disabled={totalClients === 0}
                aria-label="Cliente anterior"
                className="flex items-center justify-center rounded-xl transition-all duration-150 active:scale-95 disabled:opacity-50 flex-shrink-0"
                style={{
                  width: 56,
                  height: 56,
                  background: 'linear-gradient(135deg, #2a2a2a, #1a1a1a)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.9)',
                }}
              >
                <ChevronLeft size={28} />
              </button>

              {/* 3 Contenedores de Imágenes */}
              <div className="flex items-end justify-center gap-6 md:gap-10 overflow-hidden">
                {/* Izquierda */}
                <button
                  onClick={goToPrevious}
                  aria-label="Ver cliente anterior"
                  className="rounded-xl overflow-hidden flex items-center justify-center transition-all p-4 bg-neutral-900/60 border border-white/10"
                  style={{ width: 160, height: 160 }}
                >
                  {getImageUrl(leftClient) ? (
                    <img
                      src={getImageUrl(leftClient)}
                      alt={leftClient?.titulo ?? `Cliente ${leftClient?.id}`}
                      className="w-full h-full object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-800/50 rounded-lg" />
                  )}
                </button>

                {/* Central (Activa) */}
                <div
                  role="group"
                  aria-label={`Cliente ${currentSlide + 1} de ${totalClients}: ${currentClient?.titulo ?? ''}`}
                  className="rounded-2xl overflow-hidden flex items-center justify-center p-6 bg-neutral-900 border-2 border-red-600/50 shadow-xl shadow-red-900/30"
                  style={{ width: 280, height: 280 }}
                >
                  {getImageUrl(currentClient) ? (
                    <img
                      src={getImageUrl(currentClient)}
                      alt={currentClient?.titulo ?? `Cliente ${currentClient?.id}`}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-800 rounded-lg" />
                  )}
                </div>

                {/* Derecha */}
                <button
                  onClick={goToNext}
                  aria-label="Ver cliente siguiente"
                  className="rounded-xl overflow-hidden flex items-center justify-center transition-all p-4 bg-neutral-900/60 border border-white/10"
                  style={{ width: 160, height: 160 }}
                >
                  {getImageUrl(rightClient) ? (
                    <img
                      src={getImageUrl(rightClient)}
                      alt={rightClient?.titulo ?? `Cliente ${rightClient?.id}`}
                      className="w-full h-full object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-800/50 rounded-lg" />
                  )}
                </button>
              </div>

              {/* Botón siguiente */}
              <button
                onClick={goToNext}
                disabled={totalClients === 0}
                aria-label="Cliente siguiente"
                className="flex items-center justify-center rounded-xl transition-all duration-150 active:scale-95 disabled:opacity-50 flex-shrink-0"
                style={{
                  width: 56,
                  height: 56,
                  background: 'linear-gradient(135deg, #2a2a2a, #1a1a1a)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.9)',
                }}
              >
                <ChevronRight size={28} />
              </button>
            </div>

            {/* Controles de reproducción e indicadores */}
            <div className="flex items-center gap-4 mb-3 mt-6">
              <button
                onClick={() => setIsAutoplay(!isAutoplay)}
                aria-label={isAutoplay ? 'Pausar autoplay' : 'Activar autoplay'}
                className="flex items-center justify-center rounded-lg transition-all duration-150 active:scale-95 flex-shrink-0"
                style={{
                  width: 36,
                  height: 36,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.6)',
                }}
              >
                {isAutoplay ? <Pause size={16} /> : <Play size={16} />}
              </button>

              <div className="flex items-center gap-2 flex-wrap justify-center" role="tablist">
                {clients.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    aria-selected={index === currentSlide}
                    role="tab"
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: index === currentSlide ? 28 : 8,
                      height: 8,
                      background: index === currentSlide ? '#E51B24' : 'rgba(255,255,255,0.2)',
                      boxShadow: index === currentSlide ? '0 0 8px rgba(229,27,36,0.6)' : 'none',
                    }}
                  />
                ))}
              </div>

              <span
                className="font-mono font-bold flex-shrink-0"
                style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}
              >
                {String(currentSlide + 1).padStart(2, '0')}/{String(Math.max(1, totalClients)).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Panel Lateral Numpad */}
          <div
            className="hidden lg:flex flex-col items-center justify-center py-8 px-3 relative z-10 rounded-lg"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%)',
              border: '1px solid #E51B24',
              boxShadow: '0 0 12px rgba(229,27,36,0.2)',
            }}
          >
            <div
              className="w-2 h-10 rounded-full mb-6"
              style={{
                background: 'linear-gradient(180deg, #2a2a2a, #1a1a1a)',
                border: '1px solid #E51B24',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8)',
              }}
            />

            {totalClients > 0 && (
              <Numpad 
                activeIndex={currentSlide} 
                total={totalClients} 
                clients={clients}
                onSelect={(i: number) => goToSlide(i)} 
              />
            )}
          </div>
        </div>
      </motion.div>
    </section>
  )
}