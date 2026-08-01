const STRAPI_URL = (import.meta.env.VITE_STRAPI_URL || "").replace(/\/$/, "");
const STRAPI_API_TOKEN = (import.meta.env.VITE_STRAPI_API_TOKEN || "").replace(/^['\"]|['\"]$/g, "");

function buildStrapiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const withApiPrefix = normalizedPath.startsWith("/api/") ? normalizedPath : `/api${normalizedPath}`;
  return `${STRAPI_URL}${withApiPrefix}`;
}


export function query(url: string, isDraft =  false) {
  const headers: HeadersInit = {};

  if (STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
  }

  return fetch(buildStrapiUrl(url), { headers }).then(async (res) => {
    const contentType = res.headers.get("content-type") || "";

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`Strapi request failed (${res.status}): ${errorBody.slice(0, 200)}`);
    }

    if (!contentType.includes("application/json")) {
      const body = await res.text();
      throw new Error(`Expected JSON from Strapi but received '${contentType || "unknown"}': ${body.slice(0, 120)}`);
    }

    return res.json();
  });
}

function getStrapiURL(path: string = ""): string {
  return `${STRAPI_URL}${path}`;
}

export function getStrapiMedia(url: string | null): string {
  if (!url) return "/placeholder.svg";
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return getStrapiURL(url);
}