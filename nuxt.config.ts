import vuetify from "vite-plugin-vuetify";
import { SITE_NAME, SITE_DESCRIPTION } from "./app/data/site";

const baseURL = process.env.NUXT_APP_BASE_URL || "/";
const withBase = (path: string) => `${baseURL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "",
    },
  },
  app: {
    baseURL,
    head: {
      htmlAttrs: {
        lang: "zh-TW",
      },
      title: SITE_NAME,
      meta: [
        {
          name: "description",
          content: SITE_DESCRIPTION,
        },
        { property: "og:locale", content: "zh_TW" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: SITE_NAME },
        { property: "og:title", content: SITE_NAME },
        {
          property: "og:description",
          content: SITE_DESCRIPTION,
        },
        { property: "og:image", content: `${process.env.NUXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || ""}/images/hero-aerial.webp` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: SITE_NAME },
        {
          name: "twitter:description",
          content: SITE_DESCRIPTION,
        },
        { name: "twitter:image", content: `${process.env.NUXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || ""}/images/hero-aerial.webp` },
      ],
      link: [
        { rel: "icon", href: withBase("/favicon.ico"), sizes: "any" },
        { rel: "icon", type: "image/svg+xml", href: withBase("/favicon.svg") },
        { rel: "icon", type: "image/png", href: withBase("/favicon-32x32.png"), sizes: "32x32" },
        { rel: "icon", type: "image/png", href: withBase("/favicon-16x16.png"), sizes: "16x16" },
        { rel: "apple-touch-icon", href: withBase("/apple-touch-icon.png") },
      ],
    },
  },
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    plugins: [
      vuetify({ autoImport: true }),
    ],
  },
});
