import { query } from "./strapi";

type StrapiCollectionResponse = {
    data?: unknown;
};

type StrapiMediaItem = {
    url?: string;
    attributes?: {
        url?: string;
    };
    data?: StrapiMediaItem | StrapiMediaItem[] | null;
};

function extractImageUrl(imagen: unknown): string {
    if (!imagen) return "";

    if (typeof imagen === "string") {
        return imagen;
    }

    if (Array.isArray(imagen)) {
        return extractImageUrl(imagen[0]);
    }

    const recurso = imagen as StrapiMediaItem;
    if (recurso.url) return recurso.url;
    if (recurso.attributes?.url) return recurso.attributes.url;
    if (Array.isArray(recurso.data)) return extractImageUrl(recurso.data[0]);
    if (recurso.data) return extractImageUrl(recurso.data);

    return "";
}

function toItems(datos: unknown): unknown[] {
    if (Array.isArray(datos)) return datos;
    if (datos && typeof datos === "object") return [datos];
    return [];
}

type StrapiBlocksNode = {
    type?: string;
    text?: string;
    children?: StrapiBlocksNode[];
};

function extractTextFromBlocks(valor: unknown): string {
    if (typeof valor === "string") return valor.trim();
    if (!Array.isArray(valor)) return "";

    const visitar = (nodos: StrapiBlocksNode[]): string =>
        nodos
            .flatMap((nodo) => {
                const partes: string[] = [];

                if (nodo.text) {
                    partes.push(nodo.text);
                }

                if (Array.isArray(nodo.children)) {
                    const textoHijos = visitar(nodo.children);
                    if (textoHijos) {
                        partes.push(textoHijos);
                    }
                }

                return partes;
            })
            .join(" ")
            .replace(/\s+/g, " ")
            .trim();

    return visitar(valor as StrapiBlocksNode[]);
}

export type ServicioSectionPayload = {
    id: number;
    descripcion?: unknown;
    attributes?: {
        descripcion?: unknown;
    };
};

export async function getServicioSection(): Promise<ServicioSectionPayload[]> {
    try {
        const respuesta = (await query("/servicio?locale=es-CL")) as StrapiCollectionResponse;
        const elementos = toItems(respuesta?.data);

        return elementos
            .map((registroBruto) => {
                const registro = registroBruto as {
                    id?: number;
                    descripcion?: unknown;
                    attributes?: {
                        descripcion?: unknown;
                    };
                    [clave: string]: unknown;
                };

                const atributos = registro.attributes as Record<string, unknown> | undefined;

                // Mantener el contenido tal cual viene desde Strapi (puede ser string o bloques)

                const descripcion =
                    registro.descripcion ??
                    atributos?.descripcion ??
                    atributos?.insignia ??
                    registro["insignia"] ??
                    atributos?.badge ??
                    registro["badge"];

                return {
                    id: registro.id ?? 0,
                    descripcion,
                    attributes: registro.attributes,
                } satisfies ServicioSectionPayload;
            })
            .filter((registro) => registro.id > 0 && Boolean(registro.descripcion));
    } catch (errorCapturado) {
        console.error("Error obteniendo sección servicio:", errorCapturado);
        return [];
    }
}

export type VisionSectionPayload = {
    id: number;
    descripcion?: unknown;
    titulo?: unknown;
    attributes?: {
        descripcion?: unknown;
        titulo?: unknown;
    };
};

export async function getVisionSection(): Promise<VisionSectionPayload[]> {
    try {
        const respuesta = (await query("/vision?locale=es-CL")) as StrapiCollectionResponse;
        const elementos = toItems(respuesta?.data);

        return elementos
            .map((registroBruto) => {
                const registro = registroBruto as {
                    id?: number;
                    descripcion?: unknown;
                    titulo?: unknown;
                    attributes?: {
                        descripcion?: unknown;
                        titulo?: unknown;
                    };
                    [clave: string]: unknown;
                };

                const atributos = registro.attributes as Record<string, unknown> | undefined;

                // Mantener el contenido tal cual viene desde Strapi (puede ser string o bloques)
                const titulo =
                    atributos?.titulo ??
                    registro.titulo ??
                    atributos?.title ??
                    registro["title"];

                const descripcion =
                    registro.descripcion ??
                    atributos?.descripcion ??
                    atributos?.insignia ??
                    registro["insignia"] ??
                    atributos?.badge ??
                    registro["badge"];

                return {
                    id: registro.id ?? 0,
                    descripcion,
                    titulo,
                    attributes: registro.attributes,
                } satisfies VisionSectionPayload;
            })
            .filter((registro) => registro.id > 0 && Boolean(registro.descripcion || registro.titulo));
    } catch (errorCapturado) {
        console.error("Error obteniendo sección visión:", errorCapturado);
        return [];
    }
}

export type QuienesSomosSectionPayload = {
    id: number;
    descripcion?: unknown;
    titulo?: unknown;
    attributes?: {
        descripcion?: unknown;
        titulo?: unknown;
    };
};

export async function getQuienesSomosSection(): Promise<QuienesSomosSectionPayload[]> {
    try {
        const respuesta = (await query("/quienes-somo?locale=es-CL")) as StrapiCollectionResponse;
        const elementos = toItems(respuesta?.data);

        return elementos
            .map((registroBruto) => {
                const registro = registroBruto as {
                    id?: number;
                    descripcion?: unknown;
                    titulo?: unknown;
                    attributes?: {
                        descripcion?: unknown;
                        titulo?: unknown;
                    };
                    [clave: string]: unknown;
                };

                const atributos = registro.attributes as Record<string, unknown> | undefined;

                // Mantener el contenido tal cual viene desde Strapi (puede ser string o bloques)
                const titulo =
                    atributos?.titulo ??
                    registro.titulo ??
                    atributos?.title ??
                    registro["title"];

                const descripcion =
                    registro.descripcion ??
                    atributos?.descripcion ??
                    atributos?.insignia ??
                    registro["insignia"] ??
                    atributos?.badge ??
                    registro["badge"];

                return {
                    id: registro.id ?? 0,
                    descripcion,
                    titulo,
                    attributes: registro.attributes,
                } satisfies QuienesSomosSectionPayload;
            })
            .filter((registro) => registro.id > 0 && Boolean(registro.descripcion || registro.titulo));
    } catch (errorCapturado) {
        console.error("Error obteniendo sección visión:", errorCapturado);
        return [];
    }
}


export type NosotrosSectionPayload = {
    id: number;
    descripcion?: unknown;
    attributes?: {
        descripcion?: unknown;
    };
};

export async function getNosotrosSection(): Promise<NosotrosSectionPayload[]> {
    try {
        const respuesta = (await query("/nosotro?locale=es-CL")) as StrapiCollectionResponse;
        const elementos = toItems(respuesta?.data);

        return elementos
            .map((registroBruto) => {
                const registro = registroBruto as {
                    id?: number;
                    descripcion?: unknown;
                    attributes?: {
                        descripcion?: unknown;
                    };
                    [clave: string]: unknown;
                };

                const atributos = registro.attributes as Record<string, unknown> | undefined;

                // Mantener el contenido tal cual viene desde Strapi (puede ser string o bloques)
        
                const descripcion =
                    registro.descripcion ??
                    atributos?.descripcion ??
                    atributos?.insignia ??
                    registro["insignia"] ??
                    atributos?.badge ??
                    registro["badge"];

                return {
                    id: registro.id ?? 0,
                    descripcion,
                    attributes: registro.attributes,
                } satisfies NosotrosSectionPayload;
            })
            .filter((registro) => registro.id > 0 && Boolean(registro.descripcion));
    } catch (errorCapturado) {
        console.error("Error obteniendo sección visión:", errorCapturado);
        return [];
    }
}







