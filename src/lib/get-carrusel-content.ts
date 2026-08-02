import { unstable_SwitchBubbleInputProps } from "@radix-ui/react-switch";
import { getStrapiMedia, query } from "./strapi";

export type InformacionCarruselPayload = {
  id?: number
  documentId?: string
  titulo_rojo?: string
  titulo_blanco?: string
  url?: string | null
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

type StrapiCarruselPrincipalResponse = {
   data?: unknown;
}

export async function getCarruselSnackPro(isDraft = false): Promise<InformacionCarruselPayload[]> {
  try {
    const res: StrapiCarruselPrincipalResponse = await query(
      `carrusels?populate=imagen_carrusel`, isDraft
    )
    
    const elementos = Array.isArray(res?.data) ? res.data : [];
    if (!elementos.length) return [];

    const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

    return elementos.map((registroBruto) => {
      const titulo_rojo = (registroBruto.titulo_rojo ?? registroBruto.attributes?.titulo_rojo ?? "").trim();
      const titulo_blanco = (registroBruto.titulo_blanco ?? registroBruto.attributes?.titulo_blanco ?? "").trim();

      // Extracción del campo de imagen real desde "imagen_carrusel"
      const imageMedia = registroBruto.imagen_carrusel 
        ?? registroBruto.attributes?.imagen_carrusel;

      const rawUrl = Array.isArray(imageMedia)
        ? imageMedia[0]?.url
        : imageMedia?.url ?? imageMedia?.data?.attributes?.url;

      let finalImageUrl: string | null = null;
      if (rawUrl) {
        finalImageUrl = rawUrl.startsWith('http') ? rawUrl : `${STRAPI_URL}${rawUrl}`;
      }

      return {
        id: registroBruto.id,
        titulo_rojo,
        titulo_blanco,
        url: finalImageUrl,
      } satisfies InformacionCarruselPayload;
    });

  } catch (err) {
    console.error("Error obteniendo carrusel:", err);
    return [];
  }
}