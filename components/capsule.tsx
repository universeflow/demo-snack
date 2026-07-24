"use client"

import { Client } from './data';

interface CapsuleProps {
  client: Client;
  position: 'left' | 'center' | 'right';
  onClick?: () => void;
}

export default function Capsule({ client, position, onClick }: CapsuleProps) {
  const isCenter = position === 'center';

  return (
    <div
      onClick={onClick}
      className={`
        relative flex flex-col items-center cursor-pointer select-none
        transition-all duration-500 ease-in-out
        ${isCenter ? 'scale-100 z-10' : 'scale-75 opacity-50 z-0'}
        ${!isCenter ? 'hover:opacity-70 hover:scale-[0.80]' : ''}
      `}
      style={{ minWidth: isCenter ? 220 : 160 }}
    >
      {/* Capsule outer shell */}
      <div
        className="relative flex flex-col items-center rounded-[2.5rem] overflow-hidden"
        style={{
          width: isCenter ? 210 : 155,
          height: isCenter ? 310 : 230,
          background: isCenter
            ? 'linear-gradient(160deg, #3a3a3a 0%, #1a1a1a 40%, #2d2d2d 70%, #111 100%)'
            : 'linear-gradient(160deg, #2a2a2a 0%, #111 40%, #1d1d1d 70%, #0a0a0a 100%)',
          boxShadow: isCenter
            ? '0 0 0 2px #E51B24, 0 0 30px rgba(229,27,36,0.4), 0 0 60px rgba(229,27,36,0.15), inset 0 1px 1px rgba(255,255,255,0.12), 0 20px 60px rgba(0,0,0,0.8)'
            : '0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 1px rgba(255,255,255,0.05), 0 10px 30px rgba(0,0,0,0.6)',
        }}
      >
        {/* Top LED dot */}
        <div
          className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full z-20"
          style={{
            width: isCenter ? 10 : 7,
            height: isCenter ? 10 : 7,
            background: isCenter ? '#E51B24' : '#6b1010',
            boxShadow: isCenter ? '0 0 8px 3px rgba(229,27,36,0.7)' : 'none',
          }}
        />

        {/* Glass inner panel */}
        <div
          className="absolute inset-3 rounded-[2rem] flex flex-col items-center justify-between overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 50%, rgba(0,0,0,0.2) 100%)',
            border: '1px solid rgba(255,255,255,0.10)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {/* Glare reflection */}
          <div
            className="absolute top-2 left-4 right-16 h-8 rounded-full opacity-30 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              transform: 'rotate(-15deg)',
            }}
          />

          {/* Logo area */}
          <div
            className="w-full flex-1 flex items-center justify-center overflow-hidden rounded-[1.8rem] rounded-b-none"
            style={{ background: 'rgba(255,255,255,0.95)' }}
          >
            <img
              src={client.logoUrl}
              alt={client.name}
              className="w-full h-full object-cover"
              style={{ maxHeight: isCenter ? 160 : 120 }}
            />
          </div>

          {/* Info area */}
          <div
            className="w-full flex flex-col items-center px-3 py-2"
            style={{ background: `${client.bgColor}ee` }}
          >
            <span
              className="font-black uppercase tracking-wider text-white text-center leading-none"
              style={{ fontSize: isCenter ? 13 : 10 }}
            >
              {client.name}
            </span>
            <span
              className="text-center leading-tight mt-0.5"
              style={{
                fontSize: isCenter ? 9 : 7,
                color: '#E51B24',
                fontWeight: 600,
                letterSpacing: '0.05em',
              }}
            >
              {client.tagline}
            </span>
          </div>
        </div>

        {/* Bottom LED dot */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full z-20"
          style={{
            width: isCenter ? 10 : 7,
            height: isCenter ? 10 : 7,
            background: isCenter ? '#E51B24' : '#6b1010',
            boxShadow: isCenter ? '0 0 8px 3px rgba(229,27,36,0.7)' : 'none',
          }}
        />

        {/* Code badge */}
        <div
          className="absolute top-3 right-3 rounded-sm px-1.5 py-0.5 font-mono font-bold z-20"
          style={{
            fontSize: 8,
            background: isCenter ? '#E51B24' : '#3a1010',
            color: '#fff',
            letterSpacing: '0.1em',
          }}
        >
          {client.code}
        </div>
      </div>

    </div>
  );
}
