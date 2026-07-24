"use client"

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
}

export function Nosotros() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Geometric pattern background similar to hero
    ctx.fillStyle = '#0a0a0a'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Create random nodes
    const nodes: Array<{ x: number; y: number }> = []
    const nodeCount = 15

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
      })
    }

    // Draw lines connecting nodes
    ctx.strokeStyle = 'rgba(150, 150, 150, 0.15)'
    ctx.lineWidth = 0.5

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < Math.min(i + 4, nodes.length); j++) {
        ctx.beginPath()
        ctx.moveTo(nodes[i].x, nodes[i].y)
        ctx.lineTo(nodes[j].x, nodes[j].y)
        ctx.stroke()
      }
    }

    // Draw nodes
    ctx.fillStyle = 'rgba(150, 150, 150, 0.3)'
    for (const node of nodes) {
      ctx.beginPath()
      ctx.arc(node.x, node.y, 2, 0, Math.PI * 2)
      ctx.fill()
    }
  }, [])

  const sections = [
    {
      title: 'Quiénes Somos',
      content: 'SNACK Pro es una empresa líder en soluciones de máquinas dispensadoras inteligentes. Con más de 50 máquinas instaladas y un 99% de disponibilidad, nos comprometemos a revolucionar la forma en que las empresas distribuyen snacks y bebidas a sus empleados.',
    },
    {
      title: 'Misión',
      content: 'Proporcionar máquinas dispensadoras de última generación que mejoren la experiencia de los usuarios, aumenten la productividad en las empresas y ofrezcan soluciones de distribución automática confiables y eficientes.',
    },
    {
      title: 'Visión',
      content: 'Ser la plataforma de dispensación automática más innovadora de la región, transformando el mercado con tecnología inteligente, sostenibilidad ambiental y un servicio de excelencia en cada punto de contacto.',
    },
  ]

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4 py-12">
        <div className="max-w-7xl w-full">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
              NOSOTROS
            </h2>
            <div className="w-20 h-1 bg-red-500 mx-auto rounded-full" />
          </motion.div>

          {/* Three Sections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
                className="flex flex-col"
              >
                <div
                  className="flex flex-col h-full p-8 rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
                    border: '1px solid #E51B24',
                    boxShadow:
                      'inset 0 1px 3px rgba(255,255,255,0.05), 0 0 20px rgba(229,27,36,0.15)',
                  }}
                >
                  {/* Section Title */}
                  <h3 className="text-2xl font-bold text-red-500 mb-4">
                    {section.title}
                  </h3>

                  {/* Divider */}
                  <div className="w-12 h-1 bg-red-500 rounded-full mb-6" />

                  {/* Content */}
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base flex-grow">
                    {section.content}
                  </p>

                  {/* Footer accent */}
                  <div className="mt-6 pt-6 border-t border-red-500/20">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      <span className="text-xs text-red-500/80 font-semibold">
                        SNACK PRO
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
