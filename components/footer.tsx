"use client"

import { useState } from "react"

export function Footer() {
  return (
    <footer className="relative bg-black pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8 overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Left: Google Map Widget */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <h3 className="text-white font-bold text-sm sm:text-base md:text-lg tracking-wide">UBICACIÓN</h3>
            <div 
              className="rounded-lg overflow-hidden border border-white/20 h-48 sm:h-56 md:h-64"
              style={{
                background: '#0a0a0a',
                filter: 'brightness(0.8) contrast(1.2)',
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.1234567890!2d-70.5!3d-33.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c41a00000001%3A0x1234567890!2sSnack%20Pro!5e0!3m2!1ses!2scl!4v1234567890"
                width="100%"
                height="100%"
                style={{ 
                  border: 0,
                  filter: 'invert(0.9) hue-rotate(180deg)',
                }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>

          {/* Center: Contact Info */}
          <div className="flex flex-col gap-4 sm:gap-6">
            <h3 className="text-white font-bold text-sm sm:text-base md:text-lg tracking-wide">CONTACTO</h3>
            <div className="space-y-3 sm:space-y-4">
              {/* Phone */}
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-lg bg-red-500/20 border border-red-500/50 flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1">
                  <svg className="w-3 sm:w-4 h-3 sm:h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/60 text-xs font-mono mb-0.5 sm:mb-1">TELÉFONO</p>
                  <a href="tel:+56912345678" className="text-white hover:text-red-500 transition-colors text-xs sm:text-sm font-medium">
                    +56 9 1234 5678
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-lg bg-red-500/20 border border-red-500/50 flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1">
                  <svg className="w-3 sm:w-4 h-3 sm:h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/60 text-xs font-mono mb-0.5 sm:mb-1">EMAIL</p>
                  <a href="mailto:contacto@snackpro.cl" className="text-white hover:text-red-500 transition-colors text-xs sm:text-sm font-medium">
                    contacto@snackpro.cl
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/50 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white/60 text-xs font-mono mb-1">DIRECCIÓN</p>
                  <p className="text-white text-sm font-medium">
                    Santiago, Chile<br/>
                    <span className="text-white/60 text-xs">Región Metropolitana</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Social Links (optional) */}
          <div className="flex flex-col gap-4 sm:gap-6">
            <h3 className="text-white font-bold text-sm sm:text-base md:text-lg tracking-wide">SÍGUENOS</h3>
            <div className="space-y-2 sm:space-y-3">
              <a href="#" className="flex items-center gap-2 text-white/60 hover:text-red-500 transition-colors text-xs sm:text-sm">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                Instagram
              </a>
              <a href="#" className="flex items-center gap-2 text-white/60 hover:text-red-500 transition-colors text-xs sm:text-sm">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                Facebook
              </a>
              <a href="#" className="flex items-center gap-2 text-white/60 hover:text-red-500 transition-colors text-xs sm:text-sm">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-white/10 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            {/* Left: Logo */}
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black">
                <span className="text-red-500">Snack</span>
                <span className="text-white">Pro</span>
              </span>
            </div>

            {/* Center: Copyright */}
            <p className="text-white/60 font-mono text-xs tracking-wider">
              © 2026 SNACKPRO. TODOS LOS DERECHOS RESERVADOS.
            </p>

            {/* Right: Credits */}
            <a 
              href="https://www.aenimasoluciones.cl" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/40 hover:text-red-500 transition-colors cursor-pointer inline-block font-mono text-xs"
            >
              <span className="text-red-500 font-bold">Hecho por aenima-soluciones</span>
            </a>
          </div>
        </div>
      </div>

      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
    </footer>
  )
}
