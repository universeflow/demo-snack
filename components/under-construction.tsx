"use client"

import { motion } from "framer-motion"
import Image from "next/image"

// Nodes and edges for geometric pattern (same as hero)
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

export function UnderConstruction() {
  return (
    <main className="relative w-full min-h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Geometric SVG background */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.1 }}
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

      {/* Animated construction lines */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-1 h-32 bg-gradient-to-b from-red-500 to-transparent"
          animate={{
            left: ["0%", "100%"],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-0 right-0 w-1 h-32 bg-gradient-to-b from-red-500 to-transparent"
          animate={{
            right: ["0%", "100%"],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: 1.5,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8 sm:mb-12"
        >
          <div className="text-4xl sm:text-5xl md:text-6xl font-black">
            <span className="text-red-500">SNACK</span>
            <span className="text-white"> PRO</span>
          </div>
        </motion.div>

        {/* Main text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
            En <span className="text-red-500">Construcción</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-md mx-auto">
            Estamos trabajando en algo increíble para ti. Vuelve pronto.
          </p>
        </motion.div>

        {/* Vending Machine Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8 sm:mb-12"
        >
          <div className="relative w-32 sm:w-40 md:w-48 h-48 sm:h-56 md:h-64">
            {/* Machine body */}
            <motion.div
              className="absolute inset-0 border-2 border-red-500 rounded-2xl bg-gradient-to-br from-gray-900 to-black"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(229, 27, 36, 0.3)",
                  "0 0 40px rgba(229, 27, 36, 0.6)",
                  "0 0 20px rgba(229, 27, 36, 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* Screen */}
              <div className="absolute top-4 left-4 right-4 h-16 sm:h-20 bg-gradient-to-b from-green-900 to-black border border-green-500 rounded-lg flex items-center justify-center">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-green-500 text-xs sm:text-sm font-mono"
                >
                  CONSTRUYENDO...
                </motion.div>
              </div>

              {/* Buttons grid */}
              <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2">
                <motion.div
                  className="h-6 sm:h-8 bg-red-500 rounded hover:bg-red-600 border border-red-600"
                  whileHover={{ scale: 1.05 }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="h-6 sm:h-8 bg-red-500 rounded hover:bg-red-600 border border-red-600"
                  whileHover={{ scale: 1.05 }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                />
                <motion.div
                  className="h-6 sm:h-8 bg-red-500 rounded hover:bg-red-600 border border-red-600"
                  whileHover={{ scale: 1.05 }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                />
                <motion.div
                  className="h-6 sm:h-8 bg-red-500 rounded hover:bg-red-600 border border-red-600"
                  whileHover={{ scale: 1.05 }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.9 }}
                />
              </div>
            </motion.div>

            {/* Construction gear animation */}
            <motion.div
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-red-500 text-2xl sm:text-3xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              ⚙️
            </motion.div>
          </div>
        </motion.div>

        {/* Loading indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 sm:mt-20"
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <motion.div
                className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
              <motion.div
                className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
              />
              <motion.div
                className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
              />
            </div>
            <span className="text-gray-400 text-xs sm:text-sm ml-2">Cargando novedades...</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"
        animate={{
          opacity: [0, 1, 0],
          scaleX: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
    </main>
  )
}
