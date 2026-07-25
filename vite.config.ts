import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    open: true,
    allowedHosts: 'all',
    hmr: {
      protocol: 'wss',
      host: typeof window !== 'undefined' ? window.location.hostname : 'localhost',
      port: 443,
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'THIS_IS_UNDEFINED') return
        warn(warning)
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'react-router-dom', 'lucide-react', 'react-helmet-async'],
  },
})
