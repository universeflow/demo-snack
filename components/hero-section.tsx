import { motion } from "framer-motion"

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

export function HeroSection() {
  return (
    <section id="hero" className="relative w-full min-h-screen bg-black overflow-hidden flex items-center justify-center px-4 py-20 pt-28">
      <div
        className="relative w-full max-w-7xl min-h-[500px] md:min-h-[580px] rounded-2xl overflow-hidden p-8 sm:p-12 md:p-16 flex items-center"
        style={{
          background: "linear-gradient(135deg, #18181B 0%, #0F0F12 50%, #09090B 100%)",
          boxShadow: "0 8px 48px rgba(0,0,0,0.6)",
          border: "1px solid rgba(255,255,255,0.05)"
        }}
      >
        {/* Geometric Network SVG Background */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
        >
          {EDGES.map(([a, b], i) => (
            <line
              key={i}
              x1={NODES[a].x}
              y1={NODES[a].y}
              x2={NODES[b].x}
              y2={NODES[b].y}
              stroke="#E51B24"
              strokeWidth="0.35"
            />
          ))}
          {NODES.map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r="0.6" fill="#E51B24" />
          ))}
        </svg>

        {/* Radial glow background */}
        <div className="absolute left-[-10%] top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-red-600/10 blur-[100px] pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-3xl space-y-10">
          {/* Main Titles */}
          <div className="space-y-1 select-none">
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tight leading-none"
            >
              ELIGE
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tight leading-none"
            >
              PRESIONA
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-[#FF2A35] tracking-tight leading-none"
              style={{
                textShadow: "0 0 45px rgba(255,42,53,0.55)"
              }}
            >
              DISFRUTA
            </motion.h1>
          </div>

          {/* Statistics Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-start gap-12 sm:gap-16 pt-4"
          >
            {/* Stat 1 */}
            <div className="space-y-1">
              <div
                className="text-5xl sm:text-6xl md:text-7xl font-black text-[#FF2A35] leading-none"
                style={{ textShadow: "0 0 30px rgba(255,42,53,0.4)" }}
              >
                +50
              </div>
              <p className="text-sm sm:text-base font-bold text-[#A1A1AA] tracking-wide">
                Máquinas instaladas
              </p>
            </div>

            {/* Stat 2 */}
            <div className="space-y-1">
              <div
                className="text-5xl sm:text-6xl md:text-7xl font-black text-[#FF2A35] leading-none"
                style={{ textShadow: "0 0 30px rgba(255,42,53,0.4)" }}
              >
                99%
              </div>
              <p className="text-sm sm:text-base font-bold text-[#A1A1AA] tracking-wide">
                Disponibilidad
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
