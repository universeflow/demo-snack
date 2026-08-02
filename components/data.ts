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

  console.log('parseClientsFromStrapi - items to parse:', items);

  return items
    .filter((item: any) => item != null)
    .map((item: any) => {
      const id = item.id ?? item._id ?? 0;
      
      // imagen_cliente está en el ROOT del item, NO en attributes
      const imageField = item.imagen_cliente ?? item.imagenCliente ?? item.imagen;
      
      // titulo y otros campos también están en root
      const titulo = item.titulo ?? item.title ?? item.nombre ?? item.attributes?.titulo ?? '';
      const bgColor = item.bgColor ?? item.colorFondo ?? item.attributes?.bgColor ?? '#ffffff';
      
      console.log(`Cliente ${id} - imageField DIRECTO:`, imageField);
      
      const parsedClient = {
        id,
        bgColor,
        titulo,
        imagenCliente: extractImageFromStrapi(imageField),
      } as Client;
      
      console.log(`Cliente ${id} parseado:`, parsedClient);
      
      return parsedClient;
    });
}

function extractImageFromStrapi(field: any): { url: string; alternativeText?: string | null } | null {
  console.log('extractImageFromStrapi - input field:', field);
  
  if (!field) return null;

  // 1. CASO NUEVO: Si field ya es una URL en texto (String)
  if (typeof field === 'string') {
    return { url: field, alternativeText: null };
  }

  // 2. Si field es un array directamente (común en Strapi v4)
  if (Array.isArray(field)) {
    console.log('Field is array, length:', field.length);
    if (field.length === 0) return null;
    field = field[0]; // tomar el primer elemento
    
    // Si el elemento del array es solo el string de la URL
    if (typeof field === 'string') {
      return { url: field, alternativeText: null };
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
    return { url: media, alternativeText: null };
  }

  // 4. El media tiene la URL en un objeto o attributes
  const attrs = media.attributes ?? media;
  
  console.log('Media attributes:', attrs);
  
  // buscar url en varios posibles lugares
  const url =
    attrs.url ||
    attrs.formats?.small?.url ||
    attrs.formats?.thumbnail?.url ||
    attrs.formats?.medium?.url ||
    media.url || // url directo en root
    null;
  
  console.log('Extracted URL:', url);
  
  if (!url) return null;

  const alternativeText = attrs.alternativeText ?? attrs.alternative_text ?? null;
  return { url, alternativeText };
}