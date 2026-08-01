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
      className={`relative flex flex-col items-center justify-between transition-all duration-300 ${
        isCenter ? "scale-100 z-20 cursor-default" : "scale-90 opacity-60 hover:opacity-80 z-10 cursor-pointer"
      }`}
      style={{
        width: isCenter ? 220 : 130,
        height: isCenter ? 300 : 180,
      }}
    >
      {/* Container card */}
      <div
        className="w-full h-full rounded-2xl flex flex-col items-center justify-between p-3 relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
          border: isCenter ? "1px solid #E51B24" : "1px solid rgba(255,255,255,0.1)",
          boxShadow: isCenter ? "0 0 20px rgba(229,27,36,0.3)" : "none",
        }}
      >
        <span
          className="font-mono font-bold self-end"
          style={{ fontSize: isCenter ? 12 : 10, color: "#E51B24" }}
        >
          {client.imagenCliente?.url}
        </span>

        {/* Logo Image */}
        <div className="relative flex-1 w-full flex items-center justify-center p-2">
          <img
            src={client.imagenCliente?.url }
            alt={client.titulo}
            className="max-h-full max-w-full object-contain rounded-lg"
          />
        </div>

        {/* Name and Tagline */}
        <div className="text-center w-full mt-2">
          <h4
            className="font-black uppercase tracking-wider text-white truncate"
            style={{ fontSize: isCenter ? 14 : 10 }}
          >
            {client.titulo}
          </h4>
          <p
            className="font-medium text-red-500 truncate"
            style={{ fontSize: isCenter ? 10 : 8 }}
          >
            {client.titulo}
          </p>
        </div>
      </div>
    </div>
  )
}
