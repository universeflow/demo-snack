"use client"

import { motion } from 'framer-motion'

// Same nodes and edges as hero for consistent background pattern
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
  [32,33],[33,34],[34,35],[35,36],[30,16],[31,17],[32,39],[33,15],
  [36,11],[37,27],[38,29],[37,38],[37,30],[38,29],[39,25],[39,15],
]

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
    <section className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center px-4">
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 1200,
          minHeight: 480,
          background: 'linear-gradient(135deg, #18181B 0%, #0F0F12 50%, #09090B 100%)',
          overflow: 'hidden',
          fontFamily: "'Arial Black', 'Arial Bold', Arial, sans-serif",
          borderRadius: 12,
          boxShadow: '0 8px 48px rgba(0,0,0,0.5)',
        }}
      >
        {/* Geometric SVG background - Exact from hero */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08 }}
        >
          {EDGES.map(([a, b], i) => (
            <line
              key={i}
              x1={NODES[a].x} y1={NODES[a].y}
              x2={NODES[b].x} y2={NODES[b].y}
              stroke="#E51B24" strokeWidth="0.3"
            />
          ))}
          {NODES.map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r="0.55" fill="#E51B24" />
          ))}
        </svg>

        {/* Content */}
        <div className="relative z-10 w-full h-full flex items-center justify-center" style={{ padding: '40px 56px' }}>
        <div className="w-full">
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
      </div>
    </section>
  )
}
