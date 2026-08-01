import { unstable_SwitchBubbleInputProps } from "@radix-ui/react-switch";
import { getStrapiMedia, query } from "./strapi";
import { extractImageUrl } from "./get-nosotros-content";

export type InformacionClientesPayload = {
  id?: number
  documentId?: string
  titulo?: string
  imagenCliente?: string | null
}

type StrapiImagenDeFondo = {
  url?: string
  alternativeText?: string | null
  data?: {
    attributes?: {
      url?: string
      alternativeText?: string | null
    }
  }
}

type StrapiClientePrincipal = {
  id?: number
  documentId?: string
  titulo?: string
  imagenCliente?: StrapiImagenDeFondo 
  attributes?: {
    titulo?: string
    imagenCliente?: StrapiImagenDeFondo 
  }
}


type StrapiClientePrincipalResponse = {
   data?: unknown;
}
type StrapiMediaItem = {
    url?: string;
    attributes?: {
        url?: string;
    };
};

export async function getClientesSnackPro(isDraft = false): Promise<InformacionClientesPayload[]> {
    try {
        const statusParam = isDraft ? "&status=draft" : ""
        const res: StrapiClientePrincipalResponse = await query(
      `clientes?populate=imagen_cliente`, isDraft)
    
 const elementos = Array.isArray(res?.data) ? res.data : [];
    if (!elementos.length) return [];

    // 🔴 CAMBIO AQUÍ: Usamos import.meta.env en lugar de process.env
    const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

    return elementos.map((registroBruto) => {
      const titulo = (registroBruto.titulo ?? registroBruto.attributes?.titulo ?? "").trim();

      // Extracción del campo de imagen desde Strapi
      const imageMedia = registroBruto.imagen_cliente 
        ?? registroBruto.imagenCliente 
        ?? registroBruto.attributes?.imagen_cliente;

      // Obtener la URL
      const rawUrl = Array.isArray(imageMedia)
        ? imageMedia[0]?.url
        : imageMedia?.url ?? imageMedia?.data?.attributes?.url;

      // Construcción de la URL completa
      let finalImageUrl: string | null = null;
      if (rawUrl) {
        finalImageUrl = rawUrl.startsWith('http') ? rawUrl : `${STRAPI_URL}${rawUrl}`;
      }

      return {
        id: registroBruto.id,
        titulo,
        imagenCliente: finalImageUrl,
      } satisfies InformacionClientesPayload;
    });

  } catch (err) {
    console.error("Error obteniendo clientes:", err);
    return [];
  }
}