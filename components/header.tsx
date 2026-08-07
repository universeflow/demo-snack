import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

const navItems = [
  { title: "Inicio", path: "/" },
  { title: "Nosotros", path: "/about" },
  { title: "Servicios", path: "/services" },
  { title: "Catálogo", path: "/catalogo" },
  { title: "Proyectos", path: "/projects" },
  { title: "Contacto", path: "/contact" },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#2a2a2a]/95 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/images/logo.png"
                alt="SnackPro Logo"
                className="h-9 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Menú de navegación */}
          <nav>
            <ul className="flex space-x-4">
              {navItems.map((item) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link
                    href={item.path}
                    className={`text-sm font-medium transition-colors duration-300 ${
                      pathname === item.path
                        ? "text-red-500"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {item.title}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
export default Header