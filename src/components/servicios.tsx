"use client"

import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SERVICES = [
  {
    id: 1,
    title: "Dispensación Automática",
    description: "Máquinas dispensadoras de última tecnología con control remoto y análisis en tiempo real.",
    icon: "🤖",
  },
  {
    id: 2,
    title: "Gestión Remota",
    description: "Plataforma integral para monitoreo, reposición y análisis de datos de tus máquinas.",
    icon: "📱",
  },
  {
    id: 3,
    title: "Soporte 24/7",
    description: "Equipo técnico disponible para garantizar el funcionamiento óptimo de tus dispensadores.",
    icon: "🔧",
  },
  {
    id: 4,
    title: "Customización",
    description: "Adaptamos nuestros servicios según las necesidades específicas de tu empresa.",
    icon: "⚙️",
  },
  {
    id: 5,
    title: "Análisis de Datos",
    description: "Reportes detallados sobre consumo, preferencias y rentabilidad de tus máquinas.",
    icon: "📊",
  },
  {
    id: 6,
    title: "Mantenimiento Preventivo",
    description: "Servicio de mantenimiento programado para maximizar la vida útil de equipos.",
    icon: "🛠️",
  },
];

function GeometricPattern({ opacity = 0.06 }: { opacity?: number }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <defs>
        <pattern id="geo" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="30" r="1" fill="#E51B24" />
          <line x1="0" y1="0" x2="60" y2="60" stroke="#E51B24" strokeWidth="0.4" />
          <line x1="60" y1="0" x2="0" y2="60" stroke="#E51B24" strokeWidth="0.2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#geo)" />
    </svg>
  );
}

export function Servicios() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((i) => (i - 1 + SERVICES.length) % SERVICES.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((i) => (i + 1) % SERVICES.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const service = SERVICES[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="w-full h-screen flex items-center justify-center px-4"
      style={{ background: '#0a0a0a' }}
      aria-label="Nuestros servicios"
    >
      <div
        className="relative w-full rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden mx-auto px-2 sm:px-4"
        style={{
          background: 'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 30%, #111 70%, #1e1e1e 100%)',
          boxShadow:
            '0 0 0 1px rgba(200,200,200,0.5), 0 0 0 4px #1a1a1a, 0 0 0 6px rgba(220,220,220,0.3), 0 40px 120px rgba(0,0,0,0.9), inset 0 0 20px rgba(255,255,255,0.08)',
          border: '2px solid #C0C0C0',
          padding: '3px sm:4px md:6px',
          maxWidth: '100%',
          height: 'auto',
          minHeight: '400px',
        }}
      >
        <div
          className="relative rounded-2xl overflow-hidden flex flex-col lg:flex-row w-full"
          style={{
            background: '#121212',
            height: '100%',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.8)',
          }}
        >
          <GeometricPattern opacity={0.05} />

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none overflow-hidden opacity-30">
            <div style={{ position: 'absolute', top: 16, left: 16, width: 80, height: 80, border: '1px solid #E51B24', borderRadius: 4, transform: 'rotate(15deg)' }} />
          </div>
          <div className="absolute bottom-0 right-16 w-32 h-32 pointer-events-none overflow-hidden opacity-20">
            <div style={{ position: 'absolute', bottom: 16, right: 16, width: 60, height: 60, border: '1px solid #E51B24', borderRadius: 4, transform: 'rotate(25deg)' }} />
          </div>

          {/* Main content area */}
          <div className="flex-1 flex flex-col items-center justify-between py-8 px-4 relative z-10">
            {/* Header */}
            <div className="text-center mb-6 w-full">
              <div className="flex items-center justify-center gap-3 mb-1">
                <div className="h-px w-12 md:w-20" style={{ background: 'linear-gradient(90deg, transparent, #E51B24)' }} />
                <h2
                  className="font-black uppercase tracking-wider text-white"
                  style={{ fontSize: 'clamp(22px, 4vw, 42px)', letterSpacing: '0.08em', textShadow: '0 0 30px rgba(229,27,36,0.3)' }}
                >
                  SERVICIOS
                </h2>
                <div className="h-px w-12 md:w-20" style={{ background: 'linear-gradient(90deg, #E51B24, transparent)' }} />
              </div>
              <p
                className="uppercase tracking-widest font-medium"
                style={{ fontSize: 'clamp(9px, 1.2vw, 13px)', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.22em' }}
              >
                SOLUCIONES INTEGRALES PARA TU NEGOCIO
              </p>
            </div>

            {/* Content area */}
            <div className="flex items-center justify-center gap-4 w-full flex-grow py-6">
              {/* Prev button */}
              <button
                onClick={prev}
                disabled={isAnimating}
                className="flex-shrink-0 p-2 rounded-lg hover:bg-white/10 disabled:opacity-50 transition-all"
                aria-label="Servicio anterior"
              >
                <ChevronLeft size={24} color="#E51B24" />
              </button>

              {/* Service display */}
              <div className="flex-1 text-center px-4">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3
                  className="font-black uppercase mb-3"
                  style={{ fontSize: 'clamp(16px, 2vw, 24px)', color: '#E51B24', letterSpacing: '0.05em' }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-white/70 leading-relaxed"
                  style={{ fontSize: 'clamp(12px, 1.2vw, 16px)' }}
                >
                  {service.description}
                </p>
              </div>

              {/* Next button */}
              <button
                onClick={next}
                disabled={isAnimating}
                className="flex-shrink-0 p-2 rounded-lg hover:bg-white/10 disabled:opacity-50 transition-all"
                aria-label="Siguiente servicio"
              >
                <ChevronRight size={24} color="#E51B24" />
              </button>
            </div>

            {/* Footer indicators */}
            <div className="flex items-center justify-center gap-2 w-full">
              <span
                className="font-mono font-bold tracking-widest"
                style={{ fontSize: 11, color: '#E51B24', letterSpacing: '0.15em' }}
              >
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <div className="flex gap-1">
                {SERVICES.map((_, i) => (
                  <div
                    key={i}
                    className="h-1 rounded-full transition-all"
                    style={{
                      width: i === activeIndex ? 24 : 6,
                      background: i === activeIndex ? '#E51B24' : 'rgba(255,255,255,0.2)',
                    }}
                  />
                ))}
              </div>
              <span
                className="font-mono font-bold tracking-widest"
                style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em' }}
              >
                {String(SERVICES.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
