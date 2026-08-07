import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Zap, ShoppingBag, Coffee, Filter, Search, ChevronLeft, ChevronRight } from 'lucide-react'

function GeometricPattern({ opacity = 0.06 }: { opacity?: number }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <defs>
        <pattern
          id="geo-catalogo"
          x="0"
          y="0"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="30" cy="30" r="1" fill="#E51B24" />
          <line
            x1="0"
            y1="0"
            x2="60"
            y2="60"
            stroke="#E51B24"
            strokeWidth="0.4"
          />
          <line
            x1="60"
            y1="0"
            x2="0"
            y2="60"
            stroke="#E51B24"
            strokeWidth="0.2"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#geo-catalogo)" />
    </svg>
  )
}

interface ProductItem {
  id: string
  name: string
  category: 'maquinas' | 'snacks' | 'bebidas' | 'healthy'
  description: string
  image: string
  icon?: string
}

const CATALOG_PRODUCTS: ProductItem[] = [
  {
    id: 'vm-combo-max',
    name: 'SnackPro Combo Max',
    category: 'maquinas',
    description: 'Máquina expendedora mixta de alta capacidad con doble temperatura para snacks y bebidas.',
    image: 'https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?auto=format&fit=crop&w=600&q=80',
    icon: '🤖',
  },
  {
    id: 'vm-coffee-pro',
    name: 'SnackPro Coffee Station',
    category: 'maquinas',
    description: 'Dispensador de café gourmet para empresas con molienda de grano fresco al instante.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    icon: '☕',
  },
  {
    id: 'vm-fit-slim',
    name: 'SnackPro Health Slim',
    category: 'maquinas',
    description: 'Modelo compacto ideal para oficinas enfocado en productos fitness y nutritivos.',
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=600&q=80',
    icon: '⚡',
  },
  {
    id: 'snack-protein-pack',
    name: 'Pack Barras Proteicas',
    category: 'healthy',
    description: 'Selección de barras proteicas sin azúcar añadida para energía sostenida.',
    image: 'https://images.unsplash.com/photo-1622484210800-8850119e830e?auto=format&fit=crop&w=600&q=80',
    icon: '🏋️‍♂️',
  },
  {
    id: 'snack-mix-frutos',
    name: 'Mix Frutos Secos Premium',
    category: 'healthy',
    description: 'Porciones individuales de nueces, almendras y arándanos deshidratados.',
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80',
    icon: '🥜',
  },
  {
    id: 'drink-energy-sugarfree',
    name: 'Bebidas Energéticas Sugar-Free',
    category: 'bebidas',
    description: 'Bebidas funcionales e hidratantes refrigeradas para potenciar la jornada.',
    image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=600&q=80',
    icon: '🥤',
  },
  {
    id: 'snack-chips-artesanal',
    name: 'Chips Artesanales Horneados',
    category: 'snacks',
    description: 'Crujientes papas horneadas con sal de mar y especias naturales.',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80',
    icon: '🥔',
  },
  {
    id: 'drink-agua-saborizada',
    name: 'Aguas Minerales & Infusiones',
    category: 'bebidas',
    description: 'Aguas purificadas frías e infusiones botánicas sin calorías.',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80',
    icon: '💧',
  },
  {
    id: 'vm-mini-touch',
    name: 'SnackPro Touch Mini',
    category: 'maquinas',
    description: 'Máquina compacta con pantalla táctil HD y sistema de pago contactless.',
    image: 'https://images.unsplash.com/photo-1575224300306-1b8da36134ec?auto=format&fit=crop&w=600&q=80',
    icon: '📱',
  },
  {
    id: 'snack-barras-avena',
    name: 'Barras de Avena y Miel',
    category: 'healthy',
    description: 'Snack nutritivo a base de avena integral, miel orgánica y semillas.',
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=600&q=80',
    icon: '🌾',
  },
  {
    id: 'drink-jugo-natural',
    name: 'Jugo Prensado en Frío',
    category: 'bebidas',
    description: 'Jugos 100% naturales de frutas de estación sin conservantes.',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80',
    icon: '🧃',
  },
  {
    id: 'snack-galletas-keto',
    name: 'Galletas Keto Choco-Almendra',
    category: 'healthy',
    description: 'Bajas en carbohidratos con cacao puro y harina de almendras.',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80',
    icon: '🍪',
  },
  {
    id: 'snack-popcorn-gourmet',
    name: 'Palomitas Gourmet Sal de Mar',
    category: 'snacks',
    description: 'Palomitas de maíz horneadas con aceite de coco y sal rosada.',
    image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=600&q=80',
    icon: '🍿',
  },
  {
    id: 'drink-cafe-frio',
    name: 'Cold Brew Artesanal',
    category: 'bebidas',
    description: 'Café de especialidad extraído en frío durante 18 horas.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80',
    icon: '🧊',
  },
  {
    id: 'snack-mix-papas',
    name: 'Vegetales Deshidratados Mix',
    category: 'snacks',
    description: 'Crujiente mezcla de camote, betarraga y zanahoria con especias.',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80',
    icon: '🥕',
  },
  {
    id: 'vm-snack-express',
    name: 'SnackPro Express Wall',
    category: 'maquinas',
    description: 'Módulo de pared automatizado de alta velocidad para alto flujo de personas.',
    image: 'https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?auto=format&fit=crop&w=600&q=80',
    icon: '⚡',
  },
]

const CATEGORIES = [
  { id: 'todos', label: 'Todos', icon: Sparkles },
  { id: 'maquinas', label: 'Máquinas', icon: Zap },
  { id: 'healthy', label: 'Saludable', icon: ShoppingBag },
  { id: 'bebidas', label: 'Bebidas', icon: Coffee },
  { id: 'snacks', label: 'Snacks', icon: Filter },
]

const ITEMS_PER_PAGE = 8

export function Catalogo() {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)

  // Resetear a la página 1 al cambiar de categoría o búsqueda
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, searchQuery])

  const filteredProducts = CATALOG_PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'todos' || product.category === selectedCategory
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // Función para obtener los números de página visibles responsivamente
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push('...')
      
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i)
      }
      
      if (currentPage < totalPages - 2) pages.push('...')
      if (!pages.includes(totalPages)) pages.push(totalPages)
    }
    return pages
  }

  return (
    <section id="catalogo" className="w-full flex items-center justify-center px-2 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16 bg-transparent">
      {/* Chassis contenedor con luz LED animada */}
      <motion.div
        className="relative w-full rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden mx-auto border-2 border-red-600/70 max-w-[1600px]"
        animate={{
          boxShadow: [
            '0 0 12px rgba(229,27,36,0.25), inset 0 0 8px rgba(229,27,36,0.15)',
            '0 0 28px rgba(229,27,36,0.65), inset 0 0 16px rgba(229,27,36,0.35)',
            '0 0 12px rgba(229,27,36,0.25), inset 0 0 8px rgba(229,27,36,0.15)',
          ],
          borderColor: [
            'rgba(229,27,36,0.45)',
            'rgba(229,27,36,0.85)',
            'rgba(229,27,36,0.45)',
          ],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: 'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 30%, #111 70%, #1e1e1e 100%)',
          padding: '2px sm:padding-4 md:padding-6',
        }}
      >
        {/* Luces LED en las esquinas */}
        <motion.div
          className="absolute top-2 left-2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 z-30"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ boxShadow: '0 0 8px #E51B24' }}
        />
        <motion.div
          className="absolute top-2 right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 z-30"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
          style={{ boxShadow: '0 0 8px #E51B24' }}
        />
        <motion.div
          className="absolute bottom-2 left-2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 z-30"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.45 }}
          style={{ boxShadow: '0 0 8px #E51B24' }}
        />
        <motion.div
          className="absolute bottom-2 right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 z-30"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 1.35 }}
          style={{ boxShadow: '0 0 8px #E51B24' }}
        />

        {/* Patrón geométrico de fondo */}
        <GeometricPattern opacity={0.06} />

        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden p-3 sm:p-6 md:p-10 lg:p-12 bg-[#121212] flex flex-col items-center text-center">
          {/* Header de Sección Centrado */}
          <div className="text-center mb-6 sm:mb-8 md:mb-12 max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase text-center">
              CATÁLOGO
            </h2>
            <div className="mx-auto mt-2 sm:mt-3 w-12 sm:w-20 h-1 bg-red-600 rounded" />
          </div>

          {/* Filtros de Categorías y Buscador Responsivos */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-10 w-full max-w-5xl mx-auto">
            {/* Categorías con Scroll Horizontal en Móvil o Wrapping Limpio */}
            <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-none flex items-center justify-start sm:justify-center flex-nowrap sm:flex-wrap gap-1.5 sm:gap-2 px-1">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon
                const isActive = selectedCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 border min-h-[38px] touch-manipulation ${
                      isActive
                        ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/30 scale-102'
                        : 'bg-black/60 text-gray-300 border-white/10 hover:text-white hover:border-red-500/40 hover:bg-white/5 active:bg-white/10'
                    }`}
                  >
                    <Icon size={14} className={isActive ? 'text-white' : 'text-red-500'} />
                    <span>{cat.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Buscador Centrado en móvil, a la derecha en desktop */}
            <div className="relative w-full md:w-64 lg:w-72 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar en el catálogo..."
                className="w-full bg-black/60 border border-white/10 rounded-lg pl-9 pr-8 py-2 sm:py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors min-h-[38px]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs p-1"
                  aria-label="Limpiar búsqueda"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Grid de Productos Centrados Responsivo (1 col en móvil muy pequeño, 2 en móvil landscape/tablet, 3 en tablet grande, 4 en desktop) */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 sm:py-16 border border-dashed border-red-500/20 rounded-xl bg-black/30 w-full max-w-md mx-auto px-4">
              <p className="text-gray-400 text-xs sm:text-sm">No se encontraron productos con el filtro aplicado.</p>
              <button
                onClick={() => { setSelectedCategory('todos'); setSearchQuery(''); }}
                className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-semibold rounded-lg transition-colors min-h-[36px]"
              >
                Ver todo el catálogo
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 md:gap-6 w-full">
                {paginatedProducts.map((product) => (
                  <motion.article
                    key={product.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="group relative rounded-xl border border-red-500/20 bg-black/40 hover:bg-black/60 hover:border-red-500/60 p-3.5 sm:p-5 flex flex-col items-center justify-between text-center transition-all duration-300 hover:shadow-lg hover:shadow-red-600/10"
                  >
                    {/* Imagen centrada */}
                    <div className="relative w-full h-36 sm:h-44 md:h-48 mb-3 sm:mb-4 rounded-lg overflow-hidden bg-black/50 border border-white/5 flex items-center justify-center">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLElement
                            target.style.display = 'none'
                          }}
                        />
                      ) : null}
                      <span className="absolute text-3xl sm:text-4xl pointer-events-none drop-shadow-md">
                        {product.icon || '🍿'}
                      </span>
                    </div>

                    {/* Título centrado */}
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-white group-hover:text-red-500 transition-colors mb-1.5 sm:mb-2 text-center line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Detalle del producto */}
                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed text-center min-h-[2rem] sm:min-h-[2.5rem] flex items-center justify-center line-clamp-3">
                      {product.description}
                    </p>
                  </motion.article>
                ))}
              </div>

              {/* Paginador Responsivo */}
              {totalPages > 1 && (
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8 sm:mt-10 w-full pt-6 border-t border-white/10">
                  <p className="text-xs sm:text-sm text-gray-400 text-center md:text-left">
                    Mostrando <span className="font-semibold text-white">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> - <span className="font-semibold text-white">{Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)}</span> de <span className="font-semibold text-white">{filteredProducts.length}</span> productos
                  </p>

                  <div className="flex items-center justify-center flex-wrap gap-1.5 sm:gap-2">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="flex items-center justify-center p-2 sm:px-3 rounded-lg bg-black/60 text-gray-300 border border-white/10 hover:text-white hover:border-red-500/40 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all min-h-[38px] min-w-[38px] touch-manipulation"
                      aria-label="Página anterior"
                    >
                      <ChevronLeft size={18} />
                      <span className="hidden sm:inline text-xs ml-1">Anterior</span>
                    </button>

                    {getPageNumbers().map((page, index) => {
                      if (page === '...') {
                        return (
                          <span key={`ellipsis-${index}`} className="px-1 text-gray-500 text-xs sm:text-sm">
                            ...
                          </span>
                        )
                      }

                      const pageNumber = page as number
                      const isActive = pageNumber === currentPage
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => setCurrentPage(pageNumber)}
                          className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg text-xs sm:text-sm font-semibold transition-all touch-manipulation ${
                            isActive
                              ? 'bg-red-600 text-white border border-red-500 shadow-md shadow-red-600/30 scale-105'
                              : 'bg-black/60 text-gray-300 border border-white/10 hover:text-white hover:border-red-500/40 hover:bg-white/5'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      )
                    })}

                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="flex items-center justify-center p-2 sm:px-3 rounded-lg bg-black/60 text-gray-300 border border-white/10 hover:text-white hover:border-red-500/40 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all min-h-[38px] min-w-[38px] touch-manipulation"
                      aria-label="Siguiente página"
                    >
                      <span className="hidden sm:inline text-xs mr-1">Siguiente</span>
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </section>
  )
}

export default Catalogo
