export interface Client {
  id: number;
  bgColor?: string;
  titulo?: string;
  imagenCliente?: {
    url: string;
    alternativeText?: string | null;
  } | null;
}

export const GRID_COLS = 5;

export const DEFAULT_CLIENTS: Client[] = [
  { id: 1, titulo: 'Terravista', imagenCliente: { url: '/clients/terravista.png' } },
  { id: 2, titulo: 'Cúpula', imagenCliente: { url: '/clients/cupula.png' } },
  { id: 3, titulo: 'Veloxis', imagenCliente: { url: '/clients/veloxis.png' } },
  { id: 4, titulo: 'Sync', imagenCliente: { url: '/clients/sync.png' } },
  { id: 5, titulo: 'Aristo', imagenCliente: { url: '/clients/aristo.png' } },
];

const STRAPI_BASE_URL = (import.meta as any).env?.VITE_STRAPI_URL || 'http://localhost:1337';

// Convierte una URL relativa de Strapi en absoluta
function toAbsoluteUrl(url: string): string {
  if (!url) return url;
  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('/clients/') ||
    url.startsWith('/images/') ||
    url.startsWith('data:')
  ) {
    return url;
  }
  return `${STRAPI_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

// Mapea la respuesta de Strapi (v3/v4) a Client[]
export function parseClientsFromStrapi(response: any): Client[] {
  if (!response) return [];
  
  // Manejar diferentes estructuras de respuesta de Strapi
  let items = [];
  if (Array.isArray(response)) {
    items = response;
  } else if (Array.isArray(response.data)) {
    items = response.data;
  } else if (response.data) {
    items = [response.data];
  } else {
    items = [];
  }

  return items
    .filter((item: any) => item != null)
    .map((item: any) => {
      const id = item.id ?? item._id ?? 0;
      
      // imagen_cliente está en el ROOT del item, NO en attributes
      const imageField = item.imagen_cliente ?? item.imagenCliente ?? item.imagen;
      
      // titulo y otros campos también están en root
      const titulo = item.titulo ?? item.title ?? item.nombre ?? item.attributes?.titulo ?? '';
      const bgColor = item.bgColor ?? item.colorFondo ?? item.attributes?.bgColor ?? '#ffffff';
      
      const parsedClient = {
        id,
        bgColor,
        titulo,
        imagenCliente: extractImageFromStrapi(imageField),
      } as Client;
      
      return parsedClient;
    });
}

function extractImageFromStrapi(field: any): { url: string; alternativeText?: string | null } | null {
  if (!field) return null;

  // 1. CASO NUEVO: Si field ya es una URL en texto (String)
  if (typeof field === 'string') {
    return { url: toAbsoluteUrl(field), alternativeText: null };
  }

  // 2. Si field es un array directamente (común en Strapi v4)
  if (Array.isArray(field)) {
    if (field.length === 0) return null;
    field = field[0]; // tomar el primer elemento
    
    // Si el elemento del array es solo el string de la URL
    if (typeof field === 'string') {
      return { url: toAbsoluteUrl(field), alternativeText: null };
    }
  }

  // 3. Si Strapi v4: field.data puede ser objeto o array
  let media = field;
  if (field.data) {
    media = field.data;
    if (Array.isArray(media)) media = media[0];
  }
  
  if (!media) return null;

  // Si media termina siendo un string
  if (typeof media === 'string') {
    return { url: toAbsoluteUrl(media), alternativeText: null };
  }

  // 4. El media tiene la URL en un objeto o attributes
  const attrs = media.attributes ?? media;
  
  // buscar url en varios posibles lugares
  const url =
    attrs.url ||
    attrs.formats?.small?.url ||
    attrs.formats?.thumbnail?.url ||
    attrs.formats?.medium?.url ||
    media.url || // url directo en root
    null;
  
  if (!url) return null;

  const alternativeText = attrs.alternativeText ?? attrs.alternative_text ?? null;
  return { url: toAbsoluteUrl(url), alternativeText };
}