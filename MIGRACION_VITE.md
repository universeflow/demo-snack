# Migración: Next.js 16 → React Vite

## Cambios Completados

### 1. Estructura del Proyecto
- ✅ Creado `vite.config.ts` con configuración optimizada
- ✅ Creado `index.html` como entry point del navegador
- ✅ Creado `src/main.tsx` como entry point de React
- ✅ Creado `src/App.tsx` con React Router v6
- ✅ Creado `src/index.css` con estilos globales (sin cambios de Next.js)
- ✅ Creado `tsconfig.json` y `tsconfig.node.json` para Vite
- ✅ Actualizado `package.json` con dependencias de Vite

### 2. Rutas Implementadas
- ✅ `/` - Página de construcción (index principal)
- ✅ `/construction` - Alias a página de construcción
- ✅ `/sitio-completo` - Sitio completo en stand by

### 3. Componentes
- ✅ Todos los componentes copiados a `src/components/`
- ✅ under-construction.tsx actualizado para React puro
- ✅ Creadas páginas en `src/pages/` para las rutas

### 4. SEO y Configuración
- ✅ Implementado `react-helmet-async` para meta etiquetas dinámicas
- ✅ Preserved `sitemap.xml`, `robots.txt`, `schema.json` en `/public`
- ✅ Actualizado `.gitignore` para Vite

### 5. Utilidades
- ✅ Creado `src/lib/utils.ts` para funciones reutilizables
- ✅ Creado `src/hooks/use-toast.ts` para notificaciones

## Dependencias Principales
```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-router-dom": "^6.22.0",
  "react-helmet-async": "^2.0.4",
  "framer-motion": "^11.0.8",
  "tailwindcss": "^4.0.0",
  "vite": "^5.0.8"
}
```

## Scripts Disponibles
```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Compila para producción
npm run preview  # Previsualiza build
npm run lint     # Ejecuta linter
```

## Notas Importantes

### Para Bluehosting
1. El `dist/` generado por `npm run build` contiene la aplicación lista para producción
2. Sube el contenido de `dist/` a tu hosting
3. Configura redirecciones en `.htaccess` si es necesario para SPA
4. La aplicación ahora es una SPA de React puro sin dependencias de Node.js en runtime

### Estructura de Archivos
```
snack-pro/
├── src/
│   ├── components/         # Componentes React
│   ├── pages/              # Páginas/rutas
│   ├── lib/                # Utilidades
│   ├── hooks/              # Hooks personalizados
│   ├── App.tsx             # Componente raíz con Router
│   ├── main.tsx            # Entry point
│   └── index.css           # Estilos globales
├── public/                 # Archivos estáticos
│   ├── sitemap.xml
│   ├── robots.txt
│   └── schema.json
├── index.html              # HTML principal
├── vite.config.ts          # Config de Vite
└── package.json
```

## Próximos Pasos

1. **Completar instalación de dependencias**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Probar localmente**
   ```bash
   npm run dev
   ```

3. **Compilar para producción**
   ```bash
   npm run build
   ```

4. **Subir a Bluehosting**
   - Sube el contenido de `dist/` a tu carpeta pública en el hosting
   - Configura rewrites si es necesario para que las rutas SPA funcionen

## Contenido Preservado

- ✅ Todo el código del sitio completo en `/sitio-completo`
- ✅ Todos los estilos y animaciones
- ✅ SEO completo
- ✅ Configuración de GitHub sin cambios en rama `develop-construccion`
- ✅ Página de construcción con efectos visuales idénticos

## Notas de Compatibilidad

- React Vite NO requiere Node.js en el servidor (es totalmente static)
- La aplicación se sirve como archivos estáticos desde Bluehosting
- Todas las rutas se manejan mediante React Router en el cliente
- Los meta datos dinámicos se manejan con react-helmet-async
