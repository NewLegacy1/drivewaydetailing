/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GMB_PROFILE_URL?: string;
  readonly VITE_GMB_REVIEW_URL?: string;
  readonly VITE_GMB_MAP_EMBED_SRC?: string;
  /** Google Ads conversion "send_to" for /mobiledetailing quote form submits (AW-xxx/label). */
  readonly VITE_GOOGLE_ADS_MOBILEDETAILING_SEND_TO?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
