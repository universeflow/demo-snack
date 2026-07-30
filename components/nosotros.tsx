import React from "react"
import { motion } from "framer-motion"
import { ShieldCheck, Zap, Users, Award } from "lucide-react"

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
}

const features = [
  {
    icon: ShieldCheck,
    title: "Garantía & Confianza",
    description: "Equipos de última tecnología con mantenimiento y soporte técnico constante.",
  },
  {
    icon: Zap,
    title: "Servicio Rápido",
    description: "Abastecimiento continuo y respuesta inmediata ante cualquier requerimiento.",
  },
  {
    icon: Users,
    title: "Atención Personalizada",
    description: "Nos adaptamos a las necesidades específicas y flujo de personas de tu empresa.",
  },
  {
    icon: Award,
    title: "Calidad Premium",
    description: "Selección rigurosa de productos de alta calidad y marcas reconocidas.",
  },
]

export function Nosotros() {
  return (
    <section id="nosotros" className="relative py-24 bg-black text-white overflow-hidden border-t border-white/10">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Text & Values */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.span
                custom={0}
                variants={fadeUpVariants}
                className="inline-block text-red-500 font-mono text-sm tracking-[0.25em] uppercase font-bold"
              >
                SOBRE NOSOTROS
              </motion.span>
              <motion.h2
                custom={1}
                variants={fadeUpVariants}
                className="text-4xl md:text-5xl font-black tracking-tight leading-tight"
              >
                Revolucionando la experiencia de <span className="text-red-500">vending</span> para tu empresa
              </motion.h2>
            </div>

            <motion.p
              custom={2}
              variants={fadeUpVariants}
              className="text-white/70 text-base md:text-lg leading-relaxed"
            >
              En <strong className="text-white font-bold">SNACK PRO</strong> nos dedicamos a transformar la pausa diaria en una experiencia eficiente, moderna y conveniente. Proveemos soluciones automáticas de dispensación con tecnología de punta y un servicio integral de gestión.
            </motion.p>

            {/* Feature Grid */}
            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.title}
                    custom={3 + index * 0.5}
                    variants={fadeUpVariants}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/40 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center mb-3 text-red-500">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-bold text-white text-base mb-1">{feature.title}</h3>
                    <p className="text-xs text-white/60 leading-relaxed">{feature.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Right Column: Visual Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-white/10 to-transparent p-4 flex flex-col justify-between shadow-2xl">
              <div className="relative w-full h-3/4 rounded-2xl overflow-hidden bg-zinc-900 flex items-center justify-center">
                <img
                  src="/images/demo.png"
                  alt="Máquina Vending SNACK Pro"
                  className="max-h-full max-w-full object-contain p-4 filter drop-shadow-[0_10px_20px_rgba(229,27,36,0.3)]"
                />
              </div>

              <div className="p-4 text-center bg-black/40 rounded-2xl border border-white/10 backdrop-blur-md">
                <div className="text-2xl font-black tracking-wider text-white">
                  <span className="text-red-500">SNACK</span> PRO
                </div>
                <div className="text-xs text-white/60 font-mono tracking-widest uppercase mt-1">
                  Innovación & Calidad en Vending
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Nosotros
