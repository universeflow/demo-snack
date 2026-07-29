import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UnderConstruction from './pages/UnderConstruction'
import SitioCompleto from './pages/SitioCompleto'
import Catalogo from './pages/Catalogo'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UnderConstruction />} />
        <Route path="/sitio-completo" element={<SitioCompleto />} />
        <Route path="/construction" element={<UnderConstruction />} />
        <Route path="/catalogo" element={<Catalogo />} />
      </Routes>
    </BrowserRouter>
  )
}
