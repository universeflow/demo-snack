import React, { useState } from "react"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: "Inicio", href: "#hero" },
    { name: "Clientes", href: "#clientes" },
    { name: "Nosotros", href: "#nosotros" },
    { name: "Servicios", href: "#servicios" },
    { name: "Contacto", href: "#contacto" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-[999] bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#hero" className="flex items-center font-black text-2xl tracking-tight z-10">
            <span className="text-red-600">Snack</span>
            <span className="text-white">Pro</span>
          </a>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white hover:text-red-500 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Spacer & Mobile menu button */}
          <div className="flex items-center z-10">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-black border-b border-white/10 px-6 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-red-500 hover:bg-white/5 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}

export default Navigation
