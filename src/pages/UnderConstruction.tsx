import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import UnderConstructionComponent from '../components/under-construction'

export default function UnderConstruction() {
  useEffect(() => {
    document.documentElement.lang = 'es'
  }, [])

  return (
    <>
      <Helmet>
        <title>SNACK PRO | En Construcción</title>
        <meta name="description" content="SNACK PRO está en construcción. Pronto disponible con máquinas dispensadoras de la más alta calidad." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <UnderConstructionComponent />
    </>
  )
}
