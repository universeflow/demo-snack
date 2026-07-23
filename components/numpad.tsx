"use client"

import { useState, useEffect } from 'react';
import { clients, GRID_COLS } from './data';

interface NumpadProps {
  activeIndex: number;
  total: number;
  onSelect: (index: number) => void;
}

const LETTERS = 'ABCDEFGH'.split('');

export default function Numpad({ activeIndex, total, onSelect }: NumpadProps) {
  const [selectedLetter, setSelectedLetter] = useState<number | null>(null);
  const [displayCode, setDisplayCode] = useState<string>('__');

  const activeClient = clients[activeIndex];
  const rows = Math.ceil(total / GRID_COLS);

  // Keep display in sync with active client
  useEffect(() => {
    setDisplayCode(activeClient.code);
  }, [activeClient.code]);

  const handleLetter = (row: number) => {
    if (row >= rows) return;
    setSelectedLetter(row);
    setDisplayCode(`${String.fromCharCode(65 + row)}_`);
  };

  const handleNumber = (col: number) => {
    if (selectedLetter === null) return;
    const index = selectedLetter * GRID_COLS + (col - 1);
    if (index < total) {
      setDisplayCode(clients[index].code);
      onSelect(index);
      setSelectedLetter(null);
    }
  };

  return (
    <div
      className="flex flex-col gap-2 p-3 rounded-2xl"
      style={{
        background: 'linear-gradient(180deg, #1c1c1c 0%, #141414 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.6), 0 4px 12px rgba(0,0,0,0.4)',
        minWidth: 120,
      }}
    >
      {/* Header label */}
      <div
        className="text-center font-mono font-bold tracking-widest mb-0.5"
        style={{ fontSize: 9, color: '#E51B24', letterSpacing: '0.2em' }}
      >
        SELECCIÓN
      </div>

      {/* LCD display */}
      <div
        className="rounded-lg px-2 py-1.5 text-center font-mono"
        style={{
          background: 'rgba(0,20,0,0.7)',
          border: '1px solid rgba(0,200,0,0.25)',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8)',
        }}
      >
        <div style={{ fontSize: 7, color: 'rgba(0,255,0,0.4)', letterSpacing: '0.15em' }}>CÓDIGO</div>
        <div
          className="font-black tracking-widest"
          style={{ fontSize: 16, color: '#00ff44', textShadow: '0 0 8px rgba(0,255,68,0.6)' }}
        >
          {displayCode}
        </div>
      </div>

      {/* Letter row (rows A, B, C...) */}
      <div className="flex flex-col gap-1.5">
        <div
          className="font-mono font-bold text-center"
          style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em' }}
        >
          FILA
        </div>
        <div className="flex flex-wrap gap-1 justify-center">
          {LETTERS.map((letter, row) => {
            const isDisabled = row >= rows;
            const isActive = selectedLetter === row;
            const isCurrent = Math.floor(activeIndex / GRID_COLS) === row;

            return (
              <button
                key={letter}
                onClick={() => handleLetter(row)}
                disabled={isDisabled}
                aria-label={`Seleccionar fila ${letter}`}
                className="rounded-md font-mono font-bold transition-all duration-150 active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed"
                style={{
                  width: 24,
                  height: 24,
                  fontSize: 10,
                  background: isActive
                    ? 'linear-gradient(135deg, #E51B24, #b01218)'
                    : isCurrent
                    ? 'linear-gradient(135deg, #3a1010, #2a0808)'
                    : 'linear-gradient(135deg, #303030, #1e1e1e)',
                  color: isActive ? '#fff' : isCurrent ? '#E51B24' : 'rgba(255,255,255,0.7)',
                  border: isActive
                    ? '1px solid rgba(229,27,36,0.6)'
                    : isCurrent
                    ? '1px solid rgba(229,27,36,0.3)'
                    : '1px solid rgba(255,255,255,0.07)',
                  boxShadow: isActive
                    ? '0 0 10px rgba(229,27,36,0.5), inset 0 1px 1px rgba(255,255,255,0.1)'
                    : 'inset 0 1px 2px rgba(0,0,0,0.5)',
                }}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full" style={{ background: 'rgba(255,255,255,0.06)' }} />

      {/* Number row (columns 1-5) */}
      <div className="flex flex-col gap-1.5">
        <div
          className="font-mono font-bold text-center"
          style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em' }}
        >
          COLUMNA
        </div>
        <div className="flex gap-1 justify-center">
          {Array.from({ length: GRID_COLS }, (_, i) => i + 1).map((col) => {
            const isCurrent = (activeIndex % GRID_COLS) + 1 === col;
            const isDisabled = selectedLetter === null;
            const index = (selectedLetter ?? Math.floor(activeIndex / GRID_COLS)) * GRID_COLS + (col - 1);
            const isOutOfStock = index >= total;

            return (
              <button
                key={col}
                onClick={() => handleNumber(col)}
                disabled={isOutOfStock}
                aria-label={selectedLetter !== null ? `Seleccionar columna ${col}, código ${String.fromCharCode(65 + selectedLetter)}${col}` : `Columna ${col}`}
                className="rounded-md font-mono font-bold transition-all duration-150 active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed"
                style={{
                  width: 24,
                  height: 24,
                  fontSize: 10,
                  background: isCurrent && !isDisabled
                    ? 'linear-gradient(135deg, #E51B24, #b01218)'
                    : isCurrent
                    ? 'linear-gradient(135deg, #3a1010, #2a0808)'
                    : 'linear-gradient(135deg, #303030, #1e1e1e)',
                  color: isCurrent ? '#E51B24' : 'rgba(255,255,255,0.7)',
                  border: isCurrent
                    ? '1px solid rgba(229,27,36,0.4)'
                    : '1px solid rgba(255,255,255,0.07)',
                  boxShadow: isCurrent
                    ? '0 0 6px rgba(229,27,36,0.3)'
                    : 'inset 0 1px 2px rgba(0,0,0,0.5)',
                  opacity: isOutOfStock ? 0.2 : isDisabled ? 0.5 : 1,
                }}
              >
                {col}
              </button>
            );
          })}
        </div>
      </div>

      {/* Status indicator */}
      <div className="flex items-center gap-1.5 mt-0.5 justify-center">
        <div
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ background: '#E51B24', boxShadow: '0 0 4px rgba(229,27,36,0.8)' }}
        />
        <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', letterSpacing: '0.1em' }}>
          {selectedLetter !== null ? 'SELECCIONA COL' : 'READY'}
        </span>
      </div>
    </div>
  );
}
