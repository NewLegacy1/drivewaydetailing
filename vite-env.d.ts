/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GMB_PROFILE_URL?: string;
  readonly VITE_GMB_REVIEW_URL?: string;
  readonly VITE_GMB_MAP_EMBED_SRC?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
