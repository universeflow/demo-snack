import React, { useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle2 } from "lucide-react"

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
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ nombre: "", email: "", asunto: "", mensaje: "" })
    }, 4000)
  }

  return (
    <section id="contacto" className="w-full min-h-screen flex items-center justify-center px-4 py-12" style={{ background: '#0a0a0a' }}>
      {/* Container */}
      <div
        className="relative w-full max-w-5xl rounded-2xl md:rounded-3xl overflow-hidden mx-auto p-6 sm:p-10 md:p-12 border border-red-900/30"
        style={{
          background: 'linear-gradient(145deg, #18181b 0%, #0f0f12 50%, #09090b 100%)',
          boxShadow: '0 8px 48px rgba(0,0,0,0.8), inset 0 0 20px rgba(225,27,36,0.05)',
        }}
      >
        {/* Geometric SVG Network Pattern Background */}
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

        {/* Content Area */}
        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
              Ponte en <span className="text-red-600">Contacto</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg font-medium text-white/70 max-w-2xl mx-auto">
              Nos encantaría escucharte. Completa el formulario y nos comunicaremos pronto.
            </p>
          </div>

          {/* Form */}
          {submitted ? (
            <div className="py-16 text-center space-y-4 bg-black/40 rounded-2xl border border-red-500/30 p-8">
              <CheckCircle2 size={56} className="text-red-500 mx-auto animate-bounce" />
              <h3 className="text-2xl font-bold text-white">¡Mensaje enviado con éxito!</h3>
              <p className="text-white/70 text-sm max-w-md mx-auto">
                Gracias por comunicarte con SNACK PRO. Nos pondremos en contacto contigo a la brevedad.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Nombre & Correo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-black tracking-wider text-white uppercase">
                    NOMBRE COMPLETO <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Su nombre"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#f0f2f5] text-zinc-900 placeholder-zinc-500 font-medium focus:outline-none focus:ring-2 focus:ring-red-600 transition-all text-sm sm:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-black tracking-wider text-white uppercase">
                    CORREO ELECTRÓNICO <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="correo@empresa.cl"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#f0f2f5] text-zinc-900 placeholder-zinc-500 font-medium focus:outline-none focus:ring-2 focus:ring-red-600 transition-all text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Row 2: Asunto */}
              <div className="space-y-2">
                <label className="block text-xs font-black tracking-wider text-white uppercase">
                  ASUNTO
                </label>
                <select
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#f0f2f5] text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-red-600 transition-all text-sm sm:text-base appearance-none cursor-pointer"
                >
                  <option value="">Seleccione un asunto</option>
                  <option value="cotizacion">Cotización de Máquinas</option>
                  <option value="soporte">Servicio Técnico / Mantenimiento</option>
                  <option value="general">Consulta General</option>
                </select>
              </div>

              {/* Row 3: Mensaje */}
              <div className="space-y-2">
                <label className="block text-xs font-black tracking-wider text-white uppercase">
                  MENSAJE <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="mensaje"
                  required
                  rows={5}
                  value={formData.mensaje}
                  onChange={handleChange}
                  placeholder="Describa su consulta o requerimiento..."
                  className="w-full px-4 py-3.5 rounded-xl bg-[#f0f2f5] text-zinc-900 placeholder-zinc-500 font-medium focus:outline-none focus:ring-2 focus:ring-red-600 transition-all text-sm sm:text-base resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#E51B24] hover:bg-red-600 text-white font-black text-base sm:text-lg tracking-wide transition-all shadow-[0_4px_20px_rgba(229,27,36,0.4)] active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <Send size={18} className="rotate-45" />
                Enviar Mensaje
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default Contacto
