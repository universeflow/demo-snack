"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'

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

export function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Formulario enviado:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ nombre: '', email: '', asunto: '', mensaje: '' })
      setSubmitted(false)
    }, 3000)
  }

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
          padding: '40px 0',
        }}
      >
        {/* Geometric SVG background */}
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
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Ponte en <span style={{ color: '#E51B24' }}>Contacto</span>
              </h2>
              <p className="text-gray-400 text-lg">Nos encantaría escucharte. Completa el formulario y nos comunicaremos pronto.</p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              {/* Two columns for name and email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Nombre Completo */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                >
                  <label className="block text-sm font-bold text-gray-300 mb-2">
                    NOMBRE COMPLETO <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Su nombre"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-900 placeholder-gray-500 border-2 border-gray-300 focus:border-red-500 focus:outline-none transition"
                  />
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <label className="block text-sm font-bold text-gray-300 mb-2">
                    CORREO ELECTRÓNICO <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="correo@empresa.cl"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-900 placeholder-gray-500 border-2 border-gray-300 focus:border-red-500 focus:outline-none transition"
                  />
                </motion.div>
              </div>

              {/* Asunto */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mb-6"
              >
                <label className="block text-sm font-bold text-gray-300 mb-2">ASUNTO</label>
                <select
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-900 border-2 border-gray-300 focus:border-red-500 focus:outline-none transition"
                >
                  <option value="">Seleccione un asunto</option>
                  <option value="consulta">Consulta General</option>
                  <option value="soporte">Soporte Técnico</option>
                  <option value="ventas">Información de Ventas</option>
                  <option value="partnership">Partnership</option>
                  <option value="otro">Otro</option>
                </select>
              </motion.div>

              {/* Mensaje */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mb-8"
              >
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  MENSAJE <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  placeholder="Describa su consulta o requerimiento..."
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-900 placeholder-gray-500 border-2 border-gray-300 focus:border-red-500 focus:outline-none transition resize-none"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  background: '#E51B24',
                  color: 'white',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
                className="hover:shadow-lg transition"
              >
                <span>✈</span> {submitted ? 'Mensaje Enviado' : 'Enviar Mensaje'}
              </motion.button>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-4 bg-green-500 bg-opacity-20 border border-green-500 rounded-lg text-green-300 text-center"
                >
                  ¡Gracias! Nos comunicaremos pronto.
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
