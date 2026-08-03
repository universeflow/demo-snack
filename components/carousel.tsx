import React, { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { InformacionCarruselPayload, getCarruselSnackPro } from '../src/lib/get-carrusel-content'

type Slide = {
  src?: string
  url?: string // Adaptabilidad automática para Strapi getCarruselSnackPro()
  title?: string
  titulo_blanco?: string // Adaptabilidad automática para Strapi
  subtitle?: string
  titulo_rojo?: string // Adaptabilidad automática para Strapi
  accentColor?: string
  objectPosition?: string
}

type CarouselProps = {
  slides: Slide[]
  height?: number | string
  intervalMs?: number
}

// 1. COMPONENTE SOLO PARA EL CUADRADO DEL TEXTO
export function TextCard({ slide }: { slide?: Slide }) {
  if (!slide) return null;

  const titleText = slide.title ?? slide.titulo_blanco;
  const subtitleText = slide.subtitle ?? slide.titulo_rojo;

  if (!titleText && !subtitleText) return null;

  return (
    <motion.div
      key={`text-box-${titleText}`}
      initial={{ y: 15, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: -15, opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.22, 0.9, 0.22, 1] }}
      className="p-5 rounded-xl backdrop-blur-sm relative overflow-hidden w-full"
      style={{
        maxWidth: "480px",
        background: "linear-gradient(135deg, rgba(18,18,18,0.95) 0%, rgba(12,12,12,0.98) 100%)",
        border: `2px solid ${slide.accentColor ?? "#E51B24"}`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 20px ${slide.accentColor ?? "rgba(229,27,36,0.3)"}`,
      }}
    >
      {/* Luces LEDs en las esquinas */}
      <motion.span className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full bg-red-500 z-30" animate={{ opacity: [0.25, 1, 0.25] }} transition={{ repeat: Infinity, duration: 1.6 }} style={{ boxShadow: "0 0 8px #E51B24" }} />
      <motion.span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-red-500 z-30" animate={{ opacity: [0.25, 1, 0.25] }} transition={{ repeat: Infinity, duration: 1.6, delay: 0.8 }} style={{ boxShadow: "0 0 8px #E51B24" }} />
      <motion.span className="absolute bottom-2.5 left-2.5 w-2 h-2 rounded-full bg-red-500 z-30" animate={{ opacity: [0.25, 1, 0.25] }} transition={{ repeat: Infinity, duration: 1.6, delay: 0.4 }} style={{ boxShadow: "0 0 8px #E51B24" }} />
      <motion.span className="absolute bottom-2.5 right-2.5 w-2 h-2 rounded-full bg-red-500 z-30" animate={{ opacity: [0.25, 1, 0.25] }} transition={{ repeat: Infinity, duration: 1.6, delay: 1.2 }} style={{ boxShadow: "0 0 8px #E51B24" }} />

      {/* Brillo de fondo */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            `radial-gradient(circle at 0% 0%, ${slide.accentColor ?? "rgba(229,27,36,0.2)"} 0%, transparent 50%)`,
            `radial-gradient(circle at 100% 100%, ${slide.accentColor ?? "rgba(229,27,36,0.2)"} 0%, transparent 50%)`,
            `radial-gradient(circle at 0% 0%, ${slide.accentColor ?? "rgba(229,27,36,0.2)"} 0%, transparent 50%)`,
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtítulo */}
      {subtitleText && (
        <div
          className="text-xs md:text-sm font-bold font-mono tracking-widest mb-1.5 uppercase"
          style={{ color: slide.accentColor ?? "#E51B24", opacity: 0.95 }}
        >
          {subtitleText}
        </div>
      )}

      {/* Título Principal */}
      {titleText && (
        <h3
          className="font-black text-xl md:text-2xl leading-tight text-white"
          style={{
            textShadow: `0 4px 16px ${slide.accentColor ?? "rgba(229,27,36,0.4)"}`,
          }}
        >
          {titleText}
        </h3>
      )}

      {/* Línea decorativa roja inferior */}
      <motion.div
        className="mt-3 h-1 rounded-full"
        style={{
          background: `linear-gradient(90deg, ${slide.accentColor ?? "#E51B24"} 0%, transparent 100%)`,
        }}
        animate={{ scaleX: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  )
}

// 2. COMPONENTE PRINCIPAL CARRUSEL
export default function Carousel({ slides, height, intervalMs = 3000 }: CarouselProps) {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const mounted = useRef(true)

  useEffect(() => {
    if (!slides.length) return
    mounted.current = true
    const id = setInterval(() => {
      setDir(1)
      setIndex((i) => (i + 1) % slides.length)
    }, intervalMs)
    return () => {
      clearInterval(id)
      mounted.current = false
    }
  }, [slides.length, intervalMs])

  if (!slides || slides.length === 0) return null

  const currentSlide = slides[index]
  const imageSrc = currentSlide.src ?? currentSlide.url ?? ""
  const titleText = currentSlide.title ?? currentSlide.titulo_blanco

  const enter = (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0, rotateY: d > 0 ? 16 : -16, scale: 0.98 })
  const center = { x: 0, opacity: 1, rotateY: 0, scale: 1 }
  const exit = (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0, rotateY: d > 0 ? -16 : 16, scale: 0.98 })

  return (
    <div className="w-full flex flex-col items-center justify-center gap-3 sm:gap-4" style={{ perspective: 1600 }}>
      {/* Muestra la tarjeta del texto */}
      <TextCard slide={currentSlide} />

      {/* MARCO GRANDE PRINCIPAL CON LA IMAGEN */}
      <motion.div
        className="relative w-full mx-auto rounded-xl overflow-hidden h-[240px] xs:h-[300px] sm:h-[400px] md:h-[500px] lg:h-[620px]"
        animate={{
          boxShadow: [
            "0 0 6px rgba(229,27,36,0.18), inset 0 0 6px rgba(229,27,36,0.06)",
            "0 0 26px rgba(229,27,36,0.55), inset 0 0 14px rgba(229,27,36,0.18)",
            "0 0 6px rgba(229,27,36,0.18), inset 0 0 6px rgba(229,27,36,0.06)",
          ],
        }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          maxWidth: "1280px",
          ...(height ? { height } : {}),
          border: "2px solid rgba(229,27,36,0.55)",
          padding: 6,
          background: "linear-gradient(180deg, rgba(0,0,0,0.04), transparent)",
        }}
      >
        {/* Luces LEDs de las esquinas */}
        <motion.span className="absolute top-3 left-3 w-2 h-2 rounded-full bg-red-500 z-30" animate={{ opacity: [0.25, 1, 0.25] }} transition={{ repeat: Infinity, duration: 1.6 }} style={{ boxShadow: "0 0 8px #E51B24" }} />
        <motion.span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-red-500 z-30" animate={{ opacity: [0.25, 1, 0.25] }} transition={{ repeat: Infinity, duration: 1.6, delay: 0.8 }} style={{ boxShadow: "0 0 8px #E51B24" }} />
        <motion.span className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-red-500 z-30" animate={{ opacity: [0.25, 1, 0.25] }} transition={{ repeat: Infinity, duration: 1.6, delay: 0.4 }} style={{ boxShadow: "0 0 8px #E51B24" }} />
        <motion.span className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-red-500 z-30" animate={{ opacity: [0.25, 1, 0.25] }} transition={{ repeat: Infinity, duration: 1.6, delay: 1.2 }} style={{ boxShadow: "0 0 8px #E51B24" }} />

        <div className="relative w-full h-full rounded-md overflow-hidden bg-black/10 flex items-center justify-center">
          <AnimatePresence initial={false} custom={dir}>
            <motion.div
              key={imageSrc}
              custom={dir}
              variants={{ enter, center, exit }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.9, ease: [0.22, 0.9, 0.22, 1] }}
              style={{ height: "100%", transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Imagen Principal Grande */}
              <div className="w-full h-full flex items-center justify-center px-2 sm:px-8">
                {imageSrc && (
                  <img
                    src={imageSrc}
                    alt={titleText ?? `slide-${index + 1}`}
                    className="block"
                    style={{
                      width: "92%",
                      height: "92%",
                      objectFit: "contain",
                      objectPosition: currentSlide.objectPosition ?? "center",
                      opacity: 0.85,
                      filter: "saturate(0.98) contrast(0.95)",
                      borderRadius: 10,
                      background: "rgba(0,0,0,0.04)",
                    }}
                  />
                )}
              </div>

              {/* Capa de sombra */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(16,18,20,0.12) 0%, rgba(12,14,16,0.35) 65%, rgba(8,9,10,0.55) 100%)",
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Puntos del carrusel */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (i === index) return
                setDir(i > index ? 1 : -1)
                setIndex(i)
              }}
              aria-label={`Ir a slide ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-all focus:outline-none ${i === index ? "bg-red-500 scale-110" : "bg-white/40"}`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}