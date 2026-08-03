const normalizeUrl = (url: string) => url.replace(/\/$/, "");

const sanitizeEnvValue = (value?: string): string => {
  if (!value) return "";

  return value.trim().replace(/^['\"]|['\"]$/g, "");
};

export interface StrapiRuntimeConfig {
  baseUrl: string;
  apiPrefix: string;
  apiToken?: string;
}

const baseUrl = import.meta.env.VITE_STRAPI_URL
  ? normalizeUrl(sanitizeEnvValue(import.meta.env.VITE_STRAPI_URL))
  : "";

const apiPrefix = sanitizeEnvValue(import.meta.env.VITE_STRAPI_API_PREFIX) || "/api";

export const strapiConfig: StrapiRuntimeConfig = {
  baseUrl,
  apiPrefix,
  apiToken: sanitizeEnvValue(import.meta.env.VITE_STRAPI_API_TOKEN) || undefined,
};

export const getStrapiApiUrl = (path = ""): string => {
  if (!strapiConfig.baseUrl) {
    throw new Error("Missing VITE_STRAPI_URL environment variable.");
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${strapiConfig.baseUrl}${strapiConfig.apiPrefix}${normalizedPath}`;
};
