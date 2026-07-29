import { Buffer } from 'buffer'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'

// Polyfill de Buffer/global para @react-pdf/renderer en el navegador
if (typeof (globalThis as any).global === 'undefined') {
  ;(globalThis as any).global = globalThis
}
if (typeof (globalThis as any).Buffer === 'undefined') {
  ;(globalThis as any).Buffer = Buffer
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)
