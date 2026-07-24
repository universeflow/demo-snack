"use client"

import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Grid3x3, X, Pause, Play } from 'lucide-react';
import { clients, GRID_COLS } from './data';
import Capsule from './capsule';
import Numpad from './numpad';

const AUTOPLAY_MS = 5000;

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

export default function NuestrosClientes() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animDir, setAnimDir] = useState<'left' | 'right' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const total = clients.length;
  const activeClient = clients[activeIndex];

  const goTo = useCallback((index: number) => {
    setActiveIndex((prev) => {
      if (index === prev) return prev;
      setAnimDir(index > prev ? 'left' : 'right');
      setIsAnimating(true);
      return index;
    });
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((i) => {
      setAnimDir('right');
      setIsAnimating(true);
      return (i - 1 + total) % total;
    });
  }, [total]);

  const next = useCallback(() => {
    setActiveIndex((i) => {
      setAnimDir('left');
      setIsAnimating(true);
      return (i + 1) % total;
    });
  }, [total]);

  // Animation lock
  useEffect(() => {
    if (isAnimating) {
      timeoutRef.current = setTimeout(() => setIsAnimating(false), 500);
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [isAnimating]);

  // Autoplay
  useEffect(() => {
    if (!isAutoplay || isPaused || showGrid) return;
    const id = setInterval(() => next(), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isAutoplay, isPaused, showGrid, next]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (showGrid) {
        if (e.key === 'Escape') setShowGrid(false);
        return;
      }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [prev, next, showGrid]);

  const leftIndex = (activeIndex - 1 + total) % total;
  const rightIndex = (activeIndex + 1) % total;

  return (
    <section
      ref={sectionRef}
      className="w-full h-screen flex items-center justify-center px-4"
      style={{ background: '#0a0a0a' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carrusel"
      aria-label="Nuestros clientes"
    >
      <div
        className="relative w-full rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 30%, #111 70%, #1e1e1e 100%)',
          boxShadow:
            '0 0 0 1px rgba(255,255,255,0.06), 0 0 0 4px #1a1a1a, 0 0 0 6px rgba(255,255,255,0.04), 0 40px 120px rgba(0,0,0,0.9)',
          padding: '6px',
          maxWidth: '1152px',
          height: '692.2px',
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
            <div style={{ position:'absolute', top:16, left:16, width:80, height:80, border:'1px solid #E51B24', borderRadius:4, transform:'rotate(15deg)' }} />
          </div>
          <div className="absolute bottom-0 right-16 w-32 h-32 pointer-events-none overflow-hidden opacity-20">
            <div style={{ position:'absolute', bottom:16, right:16, width:60, height:60, border:'1px solid #E51B24', borderRadius:4, transform:'rotate(25deg)' }} />
          </div>

          {/* Main content area */}
          <div className="flex-1 flex flex-col items-center justify-between py-8 px-4 relative z-10">

            {/* Header */}
            <div className="text-center mb-2 w-full">
              <div className="flex items-center justify-center gap-3 mb-1">
                <div className="h-px w-12 md:w-20" style={{ background: 'linear-gradient(90deg, transparent, #E51B24)' }} />
                <h2
                  className="font-black uppercase tracking-wider text-white"
                  style={{ fontSize: 'clamp(22px, 4vw, 42px)', letterSpacing: '0.08em', textShadow: '0 0 30px rgba(229,27,36,0.3)' }}
                >
                  NUESTROS CLIENTES
                </h2>
                <div className="h-px w-12 md:w-20" style={{ background: 'linear-gradient(90deg, #E51B24, transparent)' }} />
              </div>
              <p
                className="uppercase tracking-widest font-medium"
                style={{ fontSize: 'clamp(9px, 1.2vw, 13px)', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.22em' }}
              >
                MÁS QUE LOGOS, HISTORIAS DISPENSADAS
              </p>
            </div>

            {/* Carousel area */}
            <div
              className="flex items-center justify-center gap-2 md:gap-6 w-full overflow-hidden py-4"
              role="region"
              aria-roledescription="carrusel de testimonios"
              aria-label="Testimonios de clientes"
            >
              {/* Prev button */}
              <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                <span
                  className="font-mono font-bold tracking-widest"
                  style={{ fontSize: 11, color: '#E51B24', letterSpacing: '0.15em' }}
                >
                  {clients[leftIndex].code}
                </span>
                <button
                  onClick={prev}
                  disabled={isAnimating}
                  aria-label="Cliente anterior"
                  className="flex items-center justify-center rounded-xl transition-all duration-150 active:scale-95 disabled:opacity-50"
                  style={{
                    width: 44,
                    height: 44,
                    background: 'linear-gradient(135deg, #2a2a2a, #1a1a1a)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.9)',
                  }}
                >
                  <ChevronLeft size={20} />
                </button>
              </div>

              {/* Three capsules */}
              <div
                className="flex items-end justify-center gap-3 md:gap-6 overflow-hidden"
                style={{
                  transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              >
                <Capsule
                  client={clients[leftIndex]}
                  position="left"
                  onClick={prev}
                />
                <div
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Cliente ${activeIndex + 1} de ${total}: ${activeClient.name}`}
                >
                  <Capsule
                    client={clients[activeIndex]}
                    position="center"
                  />
                </div>
                <Capsule
                  client={clients[rightIndex]}
                  position="right"
                  onClick={next}
                />
              </div>

              {/* Next button */}
              <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                <span
                  className="font-mono font-bold tracking-widest"
                  style={{ fontSize: 11, color: '#E51B24', letterSpacing: '0.15em' }}
                >
                  {clients[rightIndex].code}
                </span>
                <button
                  onClick={next}
                  disabled={isAnimating}
                  aria-label="Cliente siguiente"
                  className="flex items-center justify-center rounded-xl transition-all duration-150 active:scale-95 disabled:opacity-50"
                  style={{
                    width: 44,
                    height: 44,
                    background: 'linear-gradient(135deg, #2a2a2a, #1a1a1a)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.9)',
                  }}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Fixed testimony panel */}
            <div
              className="w-full max-w-lg px-4 py-3 rounded-xl text-center"
              style={{
                background: 'rgba(229,27,36,0.06)',
                border: '1px solid rgba(229,27,36,0.2)',
              }}
              aria-live="polite"
              aria-atomic="true"
            >
              <p
                className="italic leading-relaxed"
                style={{ fontSize: 'clamp(11px, 1.4vw, 14px)', color: 'rgba(255,255,255,0.8)' }}
              >
                "{activeClient.testimony}"
              </p>
              <p
                className="mt-1.5 font-bold uppercase tracking-widest"
                style={{ fontSize: 10, color: '#E51B24', letterSpacing: '0.15em' }}
              >
                {activeClient.name} · {activeClient.tagline}
              </p>
            </div>

            {/* Progress + counter row */}
            <div className="flex items-center gap-3 mb-3 mt-3">
              {/* Autoplay toggle */}
              <button
                onClick={() => setIsAutoplay(!isAutoplay)}
                aria-label={isAutoplay ? 'Pausar reproducción automática' : 'Activar reproducción automática'}
                className="flex items-center justify-center rounded-lg transition-all duration-150 active:scale-95 flex-shrink-0"
                style={{
                  width: 28,
                  height: 28,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.6)',
                }}
              >
                {isAutoplay ? <Pause size={12} /> : <Play size={12} />}
              </button>

              {/* Dots */}
              <div className="flex items-center gap-1.5 flex-wrap justify-center" role="tablist">
                {clients.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Ir al cliente ${c.name} (${c.code})`}
                    aria-selected={i === activeIndex}
                    role="tab"
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === activeIndex ? 20 : 6,
                      height: 6,
                      background: i === activeIndex ? '#E51B24' : 'rgba(255,255,255,0.2)',
                      boxShadow: i === activeIndex ? '0 0 8px rgba(229,27,36,0.6)' : 'none',
                    }}
                  />
                ))}
              </div>

              {/* Counter */}
              <span
                className="font-mono font-bold flex-shrink-0"
                style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}
              >
                {String(activeIndex + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
              </span>
            </div>

            {/* Bottom status bar + grid button */}
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <div
                className="flex items-center gap-3 px-5 py-2 rounded-xl"
                style={{
                  background: 'rgba(229,27,36,0.06)',
                  border: '1px solid rgba(229,27,36,0.2)',
                }}
              >
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: '#E51B24', boxShadow: '0 0 6px rgba(229,27,36,0.8)' }}
                />
                <span
                  className="font-black uppercase tracking-widest"
                  style={{ fontSize: 'clamp(9px, 1.2vw, 12px)', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.25em' }}
                >
                  LOGOS ENTREGADOS CON ÉXITO
                </span>
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: '#E51B24', boxShadow: '0 0 6px rgba(229,27,36,0.8)', animationDelay: '0.5s' }}
                />
              </div>

              <button
                onClick={() => setShowGrid(true)}
                aria-label="Ver todos los clientes en cuadrícula"
                className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-150 active:scale-95"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                <Grid3x3 size={14} />
                <span className="font-bold uppercase tracking-widest" style={{ fontSize: 10, letterSpacing: '0.15em' }}>
                  Ver todos
                </span>
              </button>
            </div>
          </div>

          {/* Right side numpad panel */}
          <div
            className="hidden lg:flex flex-col items-center justify-center py-8 px-3 relative z-10 rounded-lg"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%)',
              border: '1px solid #E51B24',
              boxShadow: '0 0 12px rgba(229,27,36,0.2)',
            }}
          >
            {/* Coin slot decoration */}
            <div
              className="w-2 h-10 rounded-full mb-6"
              style={{
                background: 'linear-gradient(180deg, #2a2a2a, #1a1a1a)',
                border: '1px solid #E51B24',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8)',
              }}
            />

            <Numpad activeIndex={activeIndex} total={total} onSelect={goTo} />

            {/* Dispense tray decoration */}
            <div
              className="mt-4 w-full max-w-[140px] rounded-lg p-2"
              style={{
                background: 'linear-gradient(180deg, #1a1a1a, #0d0d0d)',
                border: '1px solid #E51B24',
                boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.9)',
              }}
            >
              <div
                className="text-center font-mono font-bold tracking-widest"
                style={{ fontSize: 7, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.15em' }}
              >
                RECOGIDA
              </div>
              <div
                className="mx-auto mt-1 rounded-sm"
                style={{
                  width: '70%',
                  height: 6,
                  background: 'linear-gradient(180deg, rgba(229,27,36,0.3), transparent)',
                  border: '1px solid #E51B24',
                  boxShadow: '0 0 8px rgba(229,27,36,0.4)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid modal */}
      {showGrid && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)' }}
          onClick={() => setShowGrid(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Todos los clientes"
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl p-6"
                  style={{
                    background: 'linear-gradient(135deg, #2a2a2a, #1a1a1a)',
                    border: '1px solid #E51B24',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.9)',
                  }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                className="font-black uppercase tracking-wider text-white"
                style={{ fontSize: 18, letterSpacing: '0.08em' }}
              >
                Todos los clientes
              </h3>
              <button
                onClick={() => setShowGrid(false)}
                aria-label="Cerrar"
                className="flex items-center justify-center rounded-lg transition-all duration-150 active:scale-95"
                style={{
                  width: 32,
                  height: 32,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                <X size={16} />
              </button>
            </div>

            <div
              className="grid gap-2"
              style={{ gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)` }}
            >
              {clients.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => { goTo(i); setShowGrid(false); }}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-150 active:scale-95"
                  style={{
                    background: i === activeIndex ? 'rgba(229,27,36,0.15)' : 'rgba(255,255,255,0.03)',
                    border: i === activeIndex ? '1px solid rgba(229,27,36,0.4)' : '1px solid rgba(255,255,255,0.06)',
                  }}
                  aria-label={`Seleccionar ${c.name}, código ${c.code}`}
                >
                  <span
                    className="font-mono font-bold"
                    style={{ fontSize: 10, color: '#E51B24', letterSpacing: '0.1em' }}
                  >
                    {c.code}
                  </span>
                  <img
                    src={c.logoUrl}
                    alt={c.name}
                    className="w-10 h-10 rounded-lg object-cover"
                    style={{ filter: 'grayscale(0.3)' }}
                  />
                  <span
                    className="font-bold text-center"
                    style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)' }}
                  >
                    {c.name}
                  </span>
                </button>
              ))}
            </div>

            <p
              className="text-center mt-4 font-mono"
              style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}
            >
              Presiona un cliente para ver su testimonio · ESC para cerrar
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
