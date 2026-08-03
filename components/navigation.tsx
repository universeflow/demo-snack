import React, { useState } from "react"
import { Menu, X } from "lucide-react"

type NavProps = {
  activeSection: string
  onNavigate: (id: string) => void
}

export function Navigation({ activeSection, onNavigate }: NavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: "Inicio", id: "inicio" },
    { name: "Nosotros", id: "nosotros" },
    { name: "Servicios", id: "servicios" },
    { name: "Contacto", id: "contacto" },
  ]

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    setIsOpen(false)
    onNavigate(id)
    // update hash for bookmarking / back
    if (typeof window !== "undefined") window.history.pushState(null, "", `#${id}`)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-[999] bg-[#2a2a2a]/95 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#inicio" onClick={(e) => handleClick(e, "inicio")} className="flex items-center z-10">
            <img
              src="https://admin.snackpro.cl/logo.png"
              alt="SnackPro Logo"
              className="h-[52px] sm:h-[70px] md:h-[95px] w-auto object-contain py-1"
            />
          </a>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleClick(e, link.id)}
                className={`text-lg font-medium transition-colors ${activeSection === link.id ? "text-red-500" : "text-white hover:text-red-500"}`}
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
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleClick(e, link.id)}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${activeSection === link.id ? "text-red-500" : "text-white hover:text-red-500 hover:bg-white/5"}`}
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
