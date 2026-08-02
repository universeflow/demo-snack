"use client"

import { useState, useEffect } from 'react';
import { GRID_COLS } from './data';

interface NumpadProps {
  activeIndex: number;
  total: number;
  onSelect: (index: number) => void;
}

const LETTERS = 'ABCDEFGH'.split('');

export default function Numpad({ activeIndex, total, onSelect }: NumpadProps) {
  const [selectedLetter, setSelectedLetter] = useState<number | null>(null);
  const [displayCode, setDisplayCode] = useState<string>('A1');
  const [isProcessing, setIsProcessing] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);

  const rows = Math.ceil(total / GRID_COLS);

  useEffect(() => {
    // Si el usuario está interactuando manualmente seleccionando una letra, no sobrescribir con el autoplay
    if (selectedLetter !== null) return;

    // Calcular código completo con Letra + Número (ej: A4, B2)
    const row = Math.floor(activeIndex / GRID_COLS);
    const col = (activeIndex % GRID_COLS) + 1;
    const letter = LETTERS[row] || 'A';
    const targetCode = `${letter}${col}`;

    setIsProcessing(true);
    setGlitchEffect(true);

    // Animación de glitch rápido para revelar el código completo
    const timer = setTimeout(() => {
      setDisplayCode(targetCode);
      setIsProcessing(false);
      setGlitchEffect(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [activeIndex, selectedLetter]);

  const handleLetter = (row: number) => {
    if (row >= rows || isProcessing) return;
    
    setIsProcessing(true);
    setSelectedLetter(row);
    // Muestra la letra seleccionada y un guion bajo esperando la columna (ej: "A_")
    setDisplayCode(`${LETTERS[row]}_`);
    
    setTimeout(() => setIsProcessing(false), 200);
  };

  const handleNumber = (col: number) => {
    if (selectedLetter === null || isProcessing) return;
    const index = selectedLetter * GRID_COLS + (col - 1);
    
    if (index < total) {
      setIsProcessing(true);
      setGlitchEffect(true);
      
      const letter = LETTERS[selectedLetter];
      const finalCode = `${letter}${col}`;
      
      // Simulación rápida de procesamiento LED (88 -> Código final)
      setDisplayCode('88');
      
      setTimeout(() => {
        setDisplayCode(finalCode);
        onSelect(index);
        setSelectedLetter(null);
        setIsProcessing(false);
        setGlitchEffect(false);
      }, 350);
    }
  };

  return (
    <div
      className="flex flex-col gap-2 p-3 rounded-2xl relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #1c1c1c 0%, #141414 100%)',
        border: '1px solid #E51B24',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.6), 0 4px 12px rgba(229,27,36,0.3)',
        minWidth: 120,
      }}
    >
      {/* Efecto de escaneo LED */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(229,27,36,0.05) 50%, transparent 100%)',
          animation: 'scan 3s linear infinite',
        }}
      />

      {/* Header label con parpadeo */}
      <div
        className="text-center font-mono font-bold tracking-widest mb-0.5"
        style={{
          fontSize: 9,
          color: '#E51B24',
          letterSpacing: '0.2em',
          animation: isProcessing ? 'blink 0.5s infinite' : 'none',
        }}
      >
        {isProcessing ? 'PROCESANDO...' : 'SELECCIÓN'}
      </div>

      {/* LCD display con efecto LED */}
      <div
        className="rounded-lg px-2 py-1.5 text-center font-mono relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(0,30,0,0.9), rgba(0,15,0,0.8))',
          border: '1px solid #E51B24',
          boxShadow: `inset 0 2px 8px rgba(0,0,0,0.9), 0 0 ${isProcessing ? '20px' : '12px'} rgba(229,27,36,${isProcessing ? '0.6' : '0.3'})`,
          transition: 'all 0.3s ease',
        }}
      >
        <div style={{ fontSize: 7, color: 'rgba(0,255,0,0.4)', letterSpacing: '0.15em' }}>CÓDIGO</div>
        <div
          className="font-black tracking-widest relative"
          style={{
            fontSize: 16,
            color: isProcessing ? '#ff4444' : '#00ff44',
            textShadow: `0 0 ${isProcessing ? '12px' : '8px'} ${isProcessing ? 'rgba(255,68,68,0.8)' : 'rgba(0,255,68,0.6)'}`,
            animation: glitchEffect ? 'glitch 0.2s infinite' : 'none',
            transition: 'color 0.3s ease',
          }}
        >
          {displayCode}
        </div>

        {isProcessing && (
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, transparent 40%, rgba(0,255,68,0.3) 50%, transparent 60%)',
              animation: 'displayScan 1s linear infinite',
            }}
          />
        )}
      </div>

      {/* Letter row */}
      <div className="flex flex-col gap-1.5">
        <div className="font-mono font-bold text-center" style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em' }}>FILA</div>
        <div className="flex flex-wrap gap-1 justify-center">
          {LETTERS.map((letter, row) => {
            const isDisabled = row >= rows;
            const isActive = selectedLetter === row;
            const isCurrent = Math.floor(activeIndex / GRID_COLS) === row;

            return (
              <button
                key={letter}
                onClick={() => handleLetter(row)}
                disabled={isDisabled || isProcessing}
                className="rounded-md font-mono font-bold transition-all duration-150 active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed relative overflow-hidden"
                style={{
                  width: 24,
                  height: 24,
                  fontSize: 10,
                  background: isActive ? 'linear-gradient(135deg, #E51B24, #b01218)' : isCurrent ? 'linear-gradient(135deg, #3a1010, #2a0808)' : 'linear-gradient(135deg, #303030, #1e1e1e)',
                  color: isActive ? '#fff' : isCurrent ? '#E51B24' : 'rgba(255,255,255,0.7)',
                  border: isActive ? '1px solid rgba(229,27,36,0.6)' : isCurrent ? '1px solid rgba(229,27,36,0.3)' : '1px solid rgba(255,255,255,0.07)',
                  boxShadow: isActive ? '0 0 10px rgba(229,27,36,0.5)' : 'inset 0 1px 2px rgba(0,0,0,0.5)',
                  animation: isActive ? 'pulse 0.5s infinite' : 'none',
                }}
              >
                {letter}
                {isActive && (
                  <div className="absolute inset-0" style={{ background: 'radial-gradient(circle, rgba(229,27,36,0.4) 0%, transparent 70%)', animation: 'ripple 0.6s ease-out infinite' }} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Divider con animación */}
      <div className="h-px w-full relative" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '30%', background: 'linear-gradient(90deg, transparent, rgba(229,27,36,0.5), transparent)', animation: 'sweep 2s linear infinite' }} />
      </div>

      {/* Number row */}
      <div className="flex flex-col gap-1.5">
        <div className="font-mono font-bold text-center" style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em' }}>COLUMNA</div>
        <div className="flex gap-1 justify-center">
          {Array.from({ length: GRID_COLS }, (_, i) => i + 1).map((col) => {
            const isCurrent = (activeIndex % GRID_COLS) + 1 === col;
            const isDisabled = selectedLetter === null;
            const index = (selectedLetter ?? Math.floor(activeIndex / GRID_COLS)) * GRID_COLS + (col - 1);
            const isOutOfStock = index >= total;
            const canSelect = selectedLetter !== null && !isOutOfStock;

            return (
              <button
                key={col}
                onClick={() => handleNumber(col)}
                disabled={isOutOfStock || isProcessing}
                className="rounded-md font-mono font-bold transition-all duration-150 active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed relative overflow-hidden"
                style={{
                  width: 24,
                  height: 24,
                  fontSize: 10,
                  background: canSelect ? 'linear-gradient(135deg, #E51B24, #b01218)' : isCurrent && !isDisabled ? 'linear-gradient(135deg, #E51B24, #b01218)' : isCurrent ? 'linear-gradient(135deg, #3a1010, #2a0808)' : 'linear-gradient(135deg, #303030, #1e1e1e)',
                  color: canSelect || (isCurrent && !isDisabled) ? '#fff' : isCurrent ? '#E51B24' : 'rgba(255,255,255,0.7)',
                  border: canSelect || (isCurrent && !isDisabled) ? '1px solid rgba(229,27,36,0.6)' : isCurrent ? '1px solid rgba(229,27,36,0.4)' : '1px solid rgba(255,255,255,0.07)',
                  boxShadow: canSelect ? '0 0 10px rgba(229,27,36,0.6)' : isCurrent ? '0 0 6px rgba(229,27,36,0.3)' : 'inset 0 1px 2px rgba(0,0,0,0.5)',
                  opacity: isOutOfStock ? 0.2 : isDisabled ? 0.5 : 1,
                  animation: canSelect ? 'pulse 0.5s infinite' : 'none',
                }}
              >
                {col}
                {canSelect && (
                  <div className="absolute inset-0" style={{ background: 'radial-gradient(circle, rgba(229,27,36,0.4) 0%, transparent 70%)', animation: 'ripple 0.6s ease-out infinite' }} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @keyframes blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0.3; }
        }
        @keyframes glitch {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
        @keyframes displayScan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes ripple {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes sweep {
          0% { left: -30%; }
          100% { left: 100%; }
        }
      `}} />
    </div>
  );
}