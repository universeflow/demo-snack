import React, { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type Slide = {
  src: string
  title?: string
  subtitle?: string
  accentColor?: string
  objectPosition?: string
}

type CarouselProps = {
  slides: Slide[]
  height?: number | string
  intervalMs?: number
}

export default function Carousel({ slides, height = "min(80vh, 820px)", intervalMs = 3000 }: CarouselProps) {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const mounted = useRef(true)

  useEffect(() => {
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

  const enter = (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0, rotateY: d > 0 ? 16 : -16, scale: 0.98 })
  const center = { x: 0, opacity: 1, rotateY: 0, scale: 1 }
  const exit = (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0, rotateY: d > 0 ? -16 : 16, scale: 0.98 })

  return (
    <div className="w-full flex flex-col items-center justify-center" style={{ perspective: 1600 }}>
      <motion.div
        className="relative w-full mx-auto rounded-xl overflow-hidden"
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
          height,
          border: "2px solid rgba(229,27,36,0.55)",
          padding: 6,
          background: "linear-gradient(180deg, rgba(0,0,0,0.04), transparent)",
        }}
      >
        {/* corner LEDs */}
        <motion.span className="absolute top-3 left-3 w-2 h-2 rounded-full bg-red-500 z-30" animate={{ opacity: [0.25,1,0.25] }} transition={{ repeat: Infinity, duration: 1.6 }} style={{ boxShadow: "0 0 8px #E51B24" }} />
        <motion.span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-red-500 z-30" animate={{ opacity: [0.25,1,0.25] }} transition={{ repeat: Infinity, duration: 1.6, delay: 0.8 }} style={{ boxShadow: "0 0 8px #E51B24" }} />
        <motion.span className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-red-500 z-30" animate={{ opacity: [0.25,1,0.25] }} transition={{ repeat: Infinity, duration: 1.6, delay: 0.4 }} style={{ boxShadow: "0 0 8px #E51B24" }} />
        <motion.span className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-red-500 z-30" animate={{ opacity: [0.25,1,0.25] }} transition={{ repeat: Infinity, duration: 1.6, delay: 1.2 }} style={{ boxShadow: "0 0 8px #E51B24" }} />

        <div className="relative w-full h-full rounded-md overflow-hidden bg-black/10 flex items-center justify-center">
          <AnimatePresence initial={false} custom={dir}>
            <motion.div
              key={slides[index].src}
              custom={dir}
              variants={{ enter, center, exit }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.9, ease: [0.22, 0.9, 0.22, 1] }}
              style={{ height: "100%", transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* image wrapper */}
              <div className="w-full h-full flex items-center justify-center px-8">
                <img
                  src={slides[index].src}
                  alt={slides[index].title ?? `slide-${index + 1}`}
                  className="block"
                  style={{
                    width: "92%",
                    height: "92%",
                    objectFit: "contain",
                    objectPosition: slides[index].objectPosition ?? "center",
                    opacity: 0.48,
                    filter: "saturate(0.98) contrast(0.95)",
                    borderRadius: 10,
                    background: "rgba(0,0,0,0.04)",
                  }}
                />
              </div>

              {/* overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(16,18,20,0.12) 0%, rgba(12,14,16,0.55) 65%, rgba(8,9,10,0.65) 100%)",
                }}
              />

              {/* animated caption */}
              {(slides[index].title || slides[index].subtitle) && (
                <motion.div
                  key={`cap-${index}`}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 8, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 0.9, 0.22, 1], delay: 0.18 }}
                  className="absolute left-6 right-6 bottom-6 md:left-12 md:right-auto md:bottom-12 max-w-[60%] z-30"
                >
                  {slides[index].subtitle && (
                    <div
                      className="text-lg md:text-xl font-bold font-mono tracking-widest mb-3"
                      style={{ color: slides[index].accentColor ?? "var(--accent, #E51B24)", opacity: 0.98 }}
                    >
                      {slides[index].subtitle}
                    </div>
                  )}
                  {slides[index].title && (
                    <h3
                      className="font-black text-3xl md:text-5xl leading-tight"
                      style={{
                        color: "#fff",
                        textShadow: `0 10px 36px ${slides[index].accentColor ?? "rgba(229,27,36,0.45)"}`,
                      }}
                    >
                      {slides[index].title}
                    </h3>
                  )}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* dots */}
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
