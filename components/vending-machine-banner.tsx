"use client"

import { useEffect, useRef, useState } from 'react';
import Carousel from "./carousel"
import { getCarruselSnackPro } from '../src/lib/get-carrusel-content';

/* ─── Geometric background nodes ─── */
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
];

const EDGES: [number, number][] = [
  [0,1],[1,2],[2,3],[0,4],[1,4],[4,5],[5,6],[6,7],[7,3],[3,8],
  [8,9],[9,10],[2,8],[6,9],[10,18],[18,19],[19,20],[20,21],[21,22],
  [22,23],[23,24],[19,25],[25,26],[26,27],[27,28],[28,29],[29,24],
  [25,9],[11,12],[12,13],[13,14],[14,15],[15,16],[16,17],[11,4],
  [12,5],[13,6],[14,7],[15,9],[16,25],[17,26],[30,31],[31,32],
  [32,33],[33,34],[34,35],[35,36],[30,16],[31,17],[32,39],[33,15],
  [36,11],[37,27],[38,29],[37,38],[37,30],[38,29],[39,25],[39,15],
];

/* ─── Mini product colours for machine shelves ─── */
const SHELF_COLORS = [
  ['#E51B24','#f39c12','#27ae60','#3498db','#9b59b6','#E51B24','#f39c12'],
  ['#27ae60','#3498db','#E51B24','#f39c12','#9b59b6','#27ae60','#3498db'],
  ['#f39c12','#E51B24','#3498db','#27ae60','#E51B24','#9b59b6','#f39c12'],
  ['#3498db','#27ae60','#f39c12','#E51B24','#3498db','#f39c12','#27ae60'],
];

const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

const DEFAULT_SLIDES = [
  { src: "/images/slide1.jpg", title: "ELIGE", subtitle: "Máquinas inteligentes", objectPosition: "right center", accentColor: "var(--accent, #E51B24)" },
  { src: "/images/slide2.jpg", title: "PRESIONA", subtitle: "Variedad y control", objectPosition: "center", accentColor: "var(--accent, #E51B24)" },
  { src: "/images/slide3.jpg", title: "DISFRUTA", subtitle: "Productos premium", objectPosition: "center", accentColor: "var(--accent, #E51B24)" }
];

export default function VendingMachineBanner() {
  const [dispensing, setDispensing] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ row: number; col: number } | null>(null);
  const [slides, setSlides] = useState<any[]>(DEFAULT_SLIDES);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Cargar datos del carrusel desde Strapi */
  useEffect(() => {
    let mounted = true;
    async function fetchCarousel() {
      try {
        const response = await getCarruselSnackPro();
        if (!mounted || !response || response.length === 0) return;

        const mappedSlides = response.map((item) => ({
          src: item.url || "/images/slide1.jpg",
          title: item.titulo_blanco ?? "",
          subtitle: item.titulo_rojo ?? "",
          accentColor: "var(--accent, #E51B24)",
          objectPosition: "center"
        }));

        setSlides(mappedSlides);
      } catch (error) {
        console.error("Error cargando carrusel de Strapi:", error);
      }
    }

    fetchCarousel();
    return () => { mounted = false; };
  }, []);

  /* Auto-dispense every 3.5 s */
  useEffect(() => {
    const trigger = () => {
      const row = Math.floor(Math.random() * 4);
      const col = Math.floor(Math.random() * 7);
      setSelectedItem({ row, col });
      setDispensing(true);
      setTimeout(() => {
        setDispensing(false);
        setSelectedItem(null);
      }, 1400);
    };
    intervalRef.current = setInterval(trigger, 3500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 1200,
        minHeight: 480,
        /* background gradient kept for visual depth; overall page bg is gray */
        background: 'linear-gradient(135deg, var(--panel-bg) 0%, rgba(10,10,10,0.75) 100%)',
        overflow: 'hidden',
        fontFamily: "'Arial Black', 'Arial Bold', Arial, sans-serif",
        borderRadius: 12,
        boxShadow: '0 8px 48px rgba(0,0,0,0.5)',
      }}
    >
      {/* ── Geometric SVG background ── */}
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

      {/* ── Radial glow behind machine ── */}
      <div
        style={{
          position: 'absolute',
          right: '6%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 460,
          height: 460,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(229,27,36,0.18) 0%, rgba(229,27,36,0.06) 40%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: '14%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(30,80,180,0.12) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── Layout grid ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center', // Centrado completo
          padding: '40px 56px',
          minHeight: 480,
          gap: 24,
        }}
      >
        {/* CENTERED HERO AREA: carrusel dinámico */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-7xl mx-auto px-6">
            <Carousel
              slides={slides}
              height={"min(80vh, 820px)"}
              intervalMs={3000}
            />
          </div>
        </div>
      </div>

      {/* ── Float keyframe ── */}
      <style>{`
        @keyframes vmFloat {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-8px); }
        }
        @keyframes dropItem {
          0%   { transform: translateY(0); opacity:1; }
          80%  { transform: translateY(72px); opacity:1; }
          100% { transform: translateY(80px); opacity:0; }
        }
        @keyframes screenBlink {
          0%,90%,100% { opacity:1; }
          93%  { opacity:0.5; }
          96%  { opacity:1; }
          98%  { opacity:0.5; }
        }
        @keyframes ledPulse {
          0%,100% { opacity: 0.4; }
          50%     { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   3D-style vending machine (navy/black + red)
───────────────────────────────────────────── */
interface VMProps {
  dispensing: boolean;
  selectedItem: { row: number; col: number } | null;
}

function VendingMachine({ dispensing, selectedItem }: VMProps) {
  const W = 300;
  const H = 440;

  return (
    <div
      style={{
        animation: 'vmFloat 4s ease-in-out infinite',
        display: 'inline-block',
        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))',
      }}
    >
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Body gradient — deep navy to near-black */}
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e2a3e" />
            <stop offset="50%" stopColor="#0f1a2e" />
            <stop offset="100%" stopColor="#080d18" />
          </linearGradient>
          {/* Side panel gradient — darker for 3D depth */}
          <linearGradient id="sideGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0a1422" />
            <stop offset="100%" stopColor="#050a14" />
          </linearGradient>
          {/* Glass gradient — dark tinted with subtle reflection */}
          <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1a2a40" stopOpacity="0.6" />
            <stop offset="40%" stopColor="#0d1626" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0a1018" stopOpacity="0.5" />
          </linearGradient>
          {/* Glass reflection sweep */}
          <linearGradient id="glassReflect" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="30%" stopColor="#ffffff" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          {/* Red accent gradient */}
          <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF2A35" />
            <stop offset="100%" stopColor="#E51B24" />
          </linearGradient>
          {/* Screen gradient */}
          <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d47a1" />
            <stop offset="100%" stopColor="#082850" />
          </linearGradient>
          {/* Top brand bar gradient */}
          <linearGradient id="brandGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#152030" />
            <stop offset="100%" stopColor="#0a1018" />
          </linearGradient>
          {/* Inner shadow for shelves */}
          <linearGradient id="shelfShadow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>
          {/* Highlight on left edge */}
          <linearGradient id="edgeHighlight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ── Drop shadow base ── */}
        <ellipse cx="150" cy="432" rx="130" ry="8" fill="#000" opacity="0.5" />

        {/* ── Main body ── */}
        <rect x="15" y="10" width="270" height="420" rx="14" fill="url(#bodyGrad)" stroke="#2a3a52" strokeWidth="1.5" />
        {/* Left edge highlight */}
        <rect x="15" y="10" width="40" height="420" rx="14" fill="url(#edgeHighlight)" />

        {/* ── Top brand bar ── */}
        <rect x="15" y="10" width="270" height="38" rx="14" fill="url(#brandGrad)" />
        <rect x="15" y="34" width="270" height="14" fill="url(#brandGrad)" />
        {/* Red accent line under brand bar */}
        <rect x="15" y="46" width="270" height="3" fill="url(#redGrad)" />
        {/* Brand text */}
        <text x="150" y="34" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="bold" fontFamily="Arial" letterSpacing="1">SNACKPRO</text>
        {/* Small LED indicator */}
        <circle cx="265" cy="26" r="3" fill="#FF2A35" style={{ animation: 'ledPulse 2s ease-in-out infinite' }} />

        {/* ── Glass display window ── */}
        <rect x="25" y="56" width="180" height="250" rx="6" fill="#0a1422" stroke="#1a2a3e" strokeWidth="1" />
        <rect x="28" y="59" width="174" height="244" rx="4" fill="url(#glassGrad)" />

        {/* Inner shelf area background */}
        <rect x="30" y="61" width="170" height="240" rx="3" fill="#080d18" opacity="0.6" />

        {/* Shelf rows */}
        {SHELF_COLORS.map((row, rIdx) => (
          <g key={rIdx}>
            {/* shelf plank */}
            <rect x="30" y={61 + rIdx * 60 + 50} width="170" height="4" rx="1" fill="#1a2a3e" />
            <rect x="30" y={61 + rIdx * 60 + 50} width="170" height="2" rx="1" fill="url(#shelfShadow)" />
            {/* items */}
            {row.map((color, cIdx) => {
              const isDrop = dispensing && selectedItem?.row === rIdx && selectedItem?.col === cIdx;
              return (
                <g
                  key={cIdx}
                  style={isDrop ? { animation: 'dropItem 1.4s ease-in forwards' } : {}}
                >
                  {/* Product body */}
                  <rect
                    x={34 + cIdx * 23}
                    y={61 + rIdx * 60 + 16}
                    width="18"
                    height="32"
                    rx="4"
                    fill={color}
                    opacity="0.95"
                  />
                  {/* Product highlight */}
                  <rect
                    x={36 + cIdx * 23}
                    y={63 + rIdx * 60 + 16}
                    width="6"
                    height="10"
                    rx="2"
                    fill="rgba(255,255,255,0.35)"
                  />
                  {/* Product label line */}
                  <rect
                    x={34 + cIdx * 23}
                    y={61 + rIdx * 60 + 28}
                    width="18"
                    height="6"
                    rx="1"
                    fill="rgba(255,255,255,0.15)"
                  />
                </g>
              );
            })}
          </g>
        ))}

        {/* Glass reflection overlay */}
        <rect x="28" y="59" width="174" height="244" rx="4" fill="url(#glassReflect)" pointerEvents="none" />

        {/* ── Vending slot ── */}
        <rect x="30" y="312" width="170" height="22" rx="4" fill="#050a14" stroke="#1a2a3e" strokeWidth="1" />
        <rect x="34" y="316" width="162" height="14" rx="2" fill="#030608" />
        {/* Slot opening glow */}
        <rect x="36" y="318" width="158" height="3" rx="1" fill="#FF2A35" opacity={dispensing ? 0.6 : 0.15} />

        {/* ── Right control panel ── */}
        <rect x="212" y="56" width="62" height="278" rx="6" fill="url(#sideGrad)" stroke="#1a2a3e" strokeWidth="1" />

        {/* Screen */}
        <rect x="218" y="62" width="50" height="76" rx="5" fill="#050a14" stroke="#1a2a3e" strokeWidth="1" />
        <rect x="220" y="64" width="46" height="72" rx="3" fill="url(#screenGrad)" style={{ animation: 'screenBlink 4s ease-in-out infinite' }} />
        {/* Screen content */}
        <text x="243" y="82" textAnchor="middle" fill="#4fc3f7" fontSize="9" fontWeight="bold" fontFamily="Arial">SELECT</text>
        <text x="243" y="95" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontFamily="Arial">A CODE</text>
        <rect x="224" y="102" width="38" height="14" rx="2" fill="url(#redGrad)" />
        <text x="243" y="113" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold" fontFamily="Arial">BUY NOW</text>
        {/* Screen scanlines */}
        <line x1="220" y1="72" x2="266" y2="72" stroke="#4fc3f7" strokeWidth="0.3" opacity="0.2" />
        <line x1="220" y1="120" x2="266" y2="120" stroke="#4fc3f7" strokeWidth="0.3" opacity="0.2" />

        {/* Keypad */}
        {[0,1,2,3].map(row =>
          [0,1,2].map(col => (
            <rect
              key={`${row}-${col}`}
              x={220 + col * 16}
              y={150 + row * 16}
              width="12" height="11"
              rx="2"
              fill={dispensing && row === 0 && col === 0 ? '#FF2A35' : '#1a2a3e'}
              stroke="#2a3a52" strokeWidth="0.5"
            />
          ))
        )}

        {/* Coin slot */}
        <rect x="222" y="220" width="42" height="6" rx="3" fill="#050a14" stroke="#1a2a3e" strokeWidth="0.5" />
        <rect x="236" y="219" width="14" height="8" rx="1" fill="#030608" />

        {/* Card reader */}
        <rect x="220" y="236" width="46" height="28" rx="4" fill="#0a1422" stroke="#1a2a3e" strokeWidth="1" />
        <rect x="224" y="240" width="38" height="14" rx="2" fill="#FF2A35" opacity="0.15" />
        <rect x="226" y="242" width="34" height="10" rx="1" fill="#FF2A35" opacity="0.3" />
        <text x="243" y="251" textAnchor="middle" fill="#FF2A35" fontSize="7" fontWeight="bold">TAP</text>
        <rect x="224" y="258" width="38" height="3" rx="1" fill="#1a2a3e" />

        {/* ── Door / base section ── */}
        <rect x="25" y="340" width="250" height="84" rx="6" fill="url(#bodyGrad)" stroke="#1a2a3e" strokeWidth="1" />
        {/* Door handle */}
        <rect x="90" y="352" width="16" height="64" rx="8" fill="#2a3a52" stroke="#1a2a3e" strokeWidth="1" />
        <rect x="93" y="356" width="4" height="56" rx="2" fill="#3a4a62" opacity="0.6" />
        <rect x="200" y="356" width="10" height="52" rx="5" fill="#2a3a52" stroke="#1a2a3e" strokeWidth="1" />

        {/* Logo badge on door */}
        <rect x="120" y="360" width="72" height="34" rx="6" fill="#050a14" stroke="#1a2a3e" strokeWidth="1" />
        <text x="156" y="372" textAnchor="middle" fill="#A1A1AA" fontSize="7" fontWeight="bold" fontFamily="Arial">PULL</text>
        <rect x="124" y="376" width="64" height="14" rx="3" fill="url(#redGrad)" />
        <text x="156" y="387" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold" fontFamily="Arial">SnackPro</text>

        {/* ── Bottom base ── */}
        <rect x="15" y="420" width="270" height="10" rx="5" fill="#050a14" />
        <rect x="30" y="420" width="24" height="10" rx="3" fill="#1a2a3e" />
        <rect x="246" y="420" width="24" height="10" rx="3" fill="#1a2a3e" />

        {/* ── Red accent strips on body edges ── */}
        <rect x="15" y="56" width="3" height="284" fill="url(#redGrad)" opacity="0.7" />
        <rect x="282" y="56" width="3" height="284" fill="url(#redGrad)" opacity="0.7" />
      </svg>
    </div>
  );
}
