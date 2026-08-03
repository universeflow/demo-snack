import React from "react"
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative pt-12 sm:pt-16 pb-8 overflow-hidden border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Left: Google Map Widget */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-base md:text-lg tracking-wide">UBICACIÓN</h3>
            <div 
              className="rounded-xl overflow-hidden border border-white/15 h-48 sm:h-56 shadow-lg"
              style={{
                background: '#0a0a0a',
                filter: 'brightness(0.85) contrast(1.1)',
              }}
            >
              <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106557.88453657899!2d-70.59993693379505!3d-33.42496783378546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf19a8dab4bd%3A0x93c1479cef180269!2sLas%20Condes%2C%20Santiago%20Metropolitan%20Region!5e0!3m2!1sen!2scl!4v1785534767742!5m2!1sen!2scl"
                width="100%"
                height="100%"
                style={{ 
                  border: 0,
                  filter: 'invert(0.9) hue-rotate(180deg)',
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="Ubicación Snack Pro"
              />
            </div>
          </div>

          {/* Center: Contact Info */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-base md:text-lg tracking-wide">CONTACTO</h3>
            <div className="space-y-4">
              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone size={16} className="text-red-500" />
                </div>
                <div>
                  <p className="text-white/50 text-xs font-mono mb-0.5">TELÉFONO</p>
                    +569 68978999
                  
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail size={16} className="text-red-500" />
                </div>
                <div>
                  <p className="text-white/50 text-xs font-mono mb-0.5">EMAIL</p>
                  <a href="mailto:contacto@snackpro.cl" className="text-white hover:text-red-500 transition-colors text-sm font-medium">
                    contacto@snackpro.cl
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={16} className="text-red-500" />
                </div>
                <div>
                  <p className="text-white/50 text-xs font-mono mb-0.5">DIRECCIÓN</p>
                  <p className="text-white text-sm font-medium">
                    Santiago, Chile<br />
                    <span className="text-white/50 text-xs">Región Metropolitana</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

    
        </div>

        {/* Bottom footer */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left: Logo */}
            <a href="#inicio" className="flex items-center gap-1 text-2xl font-black">
              <span className="text-red-500">Snack</span>
              <span className="text-white">Pro</span>
            </a>

            {/* Center: Copyright */}
            <p className="text-white/50 font-mono text-xs tracking-wider">
              © {new Date().getFullYear()} SNACKPRO. TODOS LOS DERECHOS RESERVADOS.
            </p>

            {/* Right: Credits */}
            <a 
              href="https://www.aenimasoluciones.cl" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/50 hover:text-red-500 transition-colors font-mono text-xs"
            >
              <span className="text-red-500 font-bold">© 2026 aenima-soluciones | Transformación Digital</span>
            </a>
          </div>
        </div>
      </div>

      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none -z-10" />
    </footer>
  )
}

export default Footer
