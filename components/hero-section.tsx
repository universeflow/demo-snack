"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
}

export function HeroSection() {
  return (
    <section id="hero" className="relative w-full min-h-screen bg-white overflow-hidden">
      {/* Left Background Pattern - Bottom Left Corner */}
      <div className="absolute bottom-0 left-0 w-80 h-80 opacity-50 -rotate-12">
        <Image src="/images/izquierda.png" alt="Left pattern" fill className="object-cover" priority />
      </div>

      {/* Right Background Pattern - Top Right Corner */}
      <div className="absolute top-0 right-0 w-80 h-80 opacity-50 rotate-12">
        <Image src="/images/derecha.png" alt="Right pattern" fill className="object-cover" priority />
      </div>



      {/* Main Content Container */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div className="space-y-8">
              {/* Main Title */}
              <div className="space-y-2">
                <motion.h1
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  custom={0}
                  className="text-6xl md:text-8xl font-black text-[#121212] leading-[0.9]"
                >
                  ELIGE
                </motion.h1>
                <motion.h1
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  custom={0.5}
                  className="text-6xl md:text-8xl font-black text-[#121212] leading-[0.9]"
                >
                  PRESIONA
                </motion.h1>
                <motion.h1
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                  className="text-6xl md:text-8xl font-black text-red-600 leading-[0.9]"
                >
                  DISFRUTA
                </motion.h1>
              </div>

              {/* Statistics Section */}
              <motion.div
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                custom={1.5}
                className="space-y-2"
              >
                <div className="text-5xl md:text-6xl font-black text-[#121212]">2,023+</div>
                <div className="text-lg md:text-xl font-bold text-[#121212]">CLIENTES SATISFECHOS</div>
                <div className="text-base md:text-lg font-bold text-red-600">UNIDAD DE MÁQUINAS SNACK</div>
              </motion.div>

              {/* Description */}
              <motion.p
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                custom={2}
                className="text-base md:text-lg text-[#121212]/70 max-w-sm"
              >
                Llevamos las mejores máquinas dispensadoras a tu empresa o establecimiento.
              </motion.p>


            </motion.div>

            {/* Right Column - Image Content */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={3}
              className="flex flex-col items-center space-y-8"
            >
              {/* Machine Image */}
              <div className="relative w-full h-96 flex justify-center">
                <Image
                  src="/images/demo.png"
                  alt="Máquina SNACK Pro"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Machine Description */}
              <div className="text-center space-y-4">
                <h2 className="text-5xl md:text-6xl font-black text-[#121212]">MÁQUINA</h2>
                <h2 className="text-5xl md:text-6xl font-black text-[#121212]">SNACK</h2>
                <p className="text-base md:text-lg text-[#121212]/70 max-w-sm mx-auto">
                  Llevamos las mejores máquinas dispensadoras a tu empresa o establecimiento.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
