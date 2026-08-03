import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { getMisionSection, MisionSectionPayload } from "../src/lib/get-nosotros-content"
import { getVisionSection, VisionSectionPayload } from "../src/lib/get-nosotros-content"
import { getQuienesSomosSection, QuienesSomosSectionPayload } from "../src/lib/get-nosotros-content"
import { getNosotrosSection, NosotrosSectionPayload } from "../src/lib/get-nosotros-content"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"

export function Nosotros() {
  const [mision, setMision] = useState<MisionSectionPayload | null>(null)
  const [vision, setVision] = useState<VisionSectionPayload | null>(null);
  const [quienesSomos, setQuienesSomos] = useState<QuienesSomosSectionPayload | null>(null);
  const [nosotros, setNosotros] = useState<NosotrosSectionPayload | null>(null);

  useEffect(() => {
    let mounted = true;

    // Ejecutar las 3 llamadas en paralelo (Misión, Visión, Quiénes Somos)
    Promise.all([getMisionSection(), getVisionSection(), getQuienesSomosSection(), getNosotrosSection()])
      .then(([misionItems, visionItems, quienesItems, nosotrosItems]) => {
        if (!mounted) return;

        const misionItem = misionItems && misionItems.length > 0 ? misionItems[0] : null;
        setMision(misionItem);

        const visionItem = visionItems && visionItems.length > 0 ? visionItems[0] : null;
        setVision(visionItem);

        const quienesItem = quienesItems && quienesItems.length > 0 ? quienesItems[0] : null;
        setQuienesSomos(quienesItem);

        const nosotrosItem = nosotrosItems && nosotrosItems.length > 0 ? nosotrosItems[0] : null;
        setNosotros(nosotrosItem);  

      })
      .catch((error) => {
        console.error("Error cargando los datos de Nosotros:", error);
        if (!mounted) return;
        setMision(null);
        setVision(null);
        setQuienesSomos(null);
      });

    return () => {
      mounted = false;
    };
  }, []);

  // datos Mision
  const misionTitulo = mision?.titulo ?? "Misión"
  const misionDescripcion = mision?.descripcion
  // datos Vision
  const visionTitulo = vision?.titulo ?? "Visión"
  const visionDescripcion = vision?.descripcion

  // datos Quienes somos
  const quienesSomosTitulo = quienesSomos?.titulo ?? "Quiénes Somos"
  const quienesSomosDescripcion = quienesSomos?.descripcion 

  // datos Nosotros
  const nosotrosDescripcion = nosotros?.descripcion


  // helper: detecta bloques u objeto y renderiza BlocksRenderer, si es string devuelve el string
  const renderBlocksOrText = (content: unknown, fallback: string) => {
    if (!content) return fallback

    // Si es string, usar tal cual
    if (typeof content === "string") return content

    // Si parece un arreglo de bloques o un objeto de bloques, intentar renderizar
    if (Array.isArray(content) || (typeof content === "object" && content !== null)) {
      try {
        return <BlocksRenderer content={content as any} />
      } catch (err) {
        console.warn("BlocksRenderer falló al renderizar, mostrando texto plano:", err)
        // Si el objeto contiene texto plano dentro, intentar extraer alguna propiedad string
        if (typeof (content as any).text === "string") return (content as any).text
        return fallback
      }
    }

    return fallback
  }

  return (
    <section id="nosotros" className="w-full min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        className="relative w-full rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden mx-auto px-2 sm:px-4 border-2 border-red-600/70 max-w-7xl"
        animate={{
          boxShadow: [
            "0 0 12px rgba(229,27,36,0.2), inset 0 0 8px rgba(229,27,36,0.08)",
            "0 0 28px rgba(229,27,36,0.55), inset 0 0 14px rgba(229,27,36,0.2)",
            "0 0 12px rgba(229,27,36,0.2), inset 0 0 8px rgba(229,27,36,0.08)",
          ],
          borderColor: [
            "rgba(229,27,36,0.45)",
            "rgba(229,27,36,0.9)",
            "rgba(229,27,36,0.45)",
          ]
        }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          padding: '4px',
          background: 'linear-gradient(145deg,#121212 0%, #0e0e0e 100%)'
        }}
      >
        {/* corner LEDs */}
        <motion.span className="absolute top-3 left-3 w-2 h-2 rounded-full bg-red-500 z-30" animate={{ opacity: [0.25,1,0.25] }} transition={{ repeat: Infinity, duration: 1.8 }} style={{ boxShadow: "0 0 8px #E51B24" }} />
        <motion.span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-red-500 z-30" animate={{ opacity: [0.25,1,0.25] }} transition={{ repeat: Infinity, duration: 1.8, delay: 0.9 }} style={{ boxShadow: "0 0 8px #E51B24" }} />
        <motion.span className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-red-500 z-30" animate={{ opacity: [0.25,1,0.25] }} transition={{ repeat: Infinity, duration: 1.8, delay: 0.45 }} style={{ boxShadow: "0 0 8px #E51B24" }} />
        <motion.span className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-red-500 z-30" animate={{ opacity: [0.25,1,0.25] }} transition={{ repeat: Infinity, duration: 1.8, delay: 1.35 }} style={{ boxShadow: "0 0 8px #E51B24" }} />

        <div className="relative rounded-xl overflow-hidden p-4 sm:p-8 md:p-12 bg-[#121212]">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-white">NOSOTROS</h2>
            <div className="mx-auto mt-3 w-16 sm:w-20 h-1 bg-red-600 rounded" />
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch"> 
  {/* 👇 Agregamos 'items-stretch' al grid padre para que todas las tarjetas tengan la misma altura */}

  {/* Misión: contenedor relativo */}
  {/* 👇 Agregamos 'relative' y 'pb-24' (padding inferior para no tapar el texto) al <article> */}
  <article className="relative rounded-xl border border-red-500/20 p-6 bg-black/40 pb-24">
        <h3 className="text-xl font-bold text-red-500 mb-3">
          {typeof misionTitulo === "string"
            ? misionTitulo
            : <BlocksRenderer content={misionTitulo as any} />
          }
        </h3>

        <p className="text-sm text-white/80 leading-relaxed">
          {renderBlocksOrText(misionDescripcion, "Proporcionar máquinas dispensadoras de última generación...")}
        </p>

        {/* 👇 Convertimos este div en absoluto: 'absolute', 'bottom-6', 'left-6', 'right-6' */}
        <div className="absolute bottom-6 left-6 right-6 rounded-md border border-red-800/30 p-3 bg-black/30 text-red-400 font-mono text-xs">
          • SNACK PRO
        </div>
    </article>

  {/* Visión: contenedor relativo */}
  {/* 👇 Repetimos: 'relative' y 'pb-24' al <article> */}
      <article className="relative rounded-xl border border-red-500/20 p-6 bg-black/40 pb-24">
          <h3 className="text-xl font-bold text-red-500 mb-3 ">
            {typeof visionTitulo === "string"
              ? visionTitulo
              : <BlocksRenderer content={visionTitulo as any} />
            }
          </h3>
          <p className="text-sm text-white/80 leading-relaxed">
            {renderBlocksOrText(visionDescripcion, "")}
          </p>

          {/* 👇 Repetimos: 'absolute', 'bottom-6', 'left-6', 'right-6' */}
          <div className="absolute bottom-6 left-6 right-6 rounded-md border border-red-800/30 p-3 bg-black/30 text-red-400 font-mono text-xs">
            • SNACK PRO
          </div>
      </article>
        </div>

          {/* Body text area (texto largo de foto) */}
          <div className="mt-8 prose prose-invert max-w-none text-sm text-white/80 text-justify">
            {renderBlocksOrText(nosotrosDescripcion, "")}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Nosotros
