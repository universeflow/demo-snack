/// <reference types="vite/client" />

// Global constants defined at build time
declare const __ROUTE_MESSAGING_ENABLED__: boolean;

interface ImportMetaEnv {
	readonly VITE_STRAPI_URL: string;
	readonly VITE_STRAPI_API_PREFIX?: string;
	readonly VITE_STRAPI_API_TOKEN?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
