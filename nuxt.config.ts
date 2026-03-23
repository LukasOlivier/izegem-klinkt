import Aura from "@primeuix/themes/aura";

import { defineNuxtConfig } from "nuxt/config";
import bands from "./data/bands";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@primevue/nuxt-module",
    "@nuxt/image",
    "@nuxt/eslint",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
  ],

  runtimeConfig: {
    public: {
      eventDate: process.env.EVENT_DATE,
      lineupPdfUrl: process.env.LINEUP_PDF_URL,
      clientUrl: process.env.CLIENT_URL,
    },
    googleSheetsApiKey: process.env.NUXT_PRIVATE_GOOGLE_SHEETS_API_KEY,
  },

  // Nuxt Image module configuration
  image: {
    format: ["webp"],
    quality: 80,
  },

  // Nuxt SEO module configuration
  app: {
    head: {
      title: "Izegem Klinkt",
      titleTemplate: "%s - Izegem Klinkt",
      script: [
        {
          "src": process.env.VITE_UMAMI_SCRIPT_URL,
          "defer": true,
          "data-website-id": process.env.VITE_UMAMI_WEBSITE_ID,
        },
      ],
      htmlAttrs: {
        lang: "nl",
      },
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
      meta: [
        { charset: "utf-8" },
        { name: "msapplication-TileColor", content: "#ffffff" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Izegem Klinkt - Muzikale Tournée in de Pekkersstad. Programma 4 mei 2025. Gratis toegang. 14 deelnemende cafés. 14 bands. 1 stad. 1 muzikale tournée.",
        },
        {
          name: "keywords",
          content:
            "Izegem Klinkt, Izegem, Muziek, Pekkersstad, Tournée, 4 mei 2025, Gratis, 14 cafés, 14 bands, 1 stad, 1 muzikale tournée, kroegentocht, tocht, kroegen, programma",
        },
        { property: "og:type", content: "website" },
        {
          property: "og:title",
          content: "Izegem Klinkt Programma",
        },
        {
          property: "og:description",
          content:
            "Izegem Klinkt - Muzikale Tournée in de Pekkersstad. Programma 4 mei 2025. Gratis toegang. 14 deelnemende cafés. 14 bands. 1 stad. 1 muzikale tournée.",
        },
        {
          property: "og:image",
          content: "https://www.izegemklinkt.be/logo.png",
        },
        {
          property: "og:url",
          content: "https://www.izegemklinkt.be",
        },
        {
          name: "twitter:image",
          content: "https://www.izegemklinkt.be/logo.png",
        },
      ],
    },
  },

  sitemap: {
    siteUrl: "https://www.izegemklinkt.be",
    generateOnBuild: true,
    urls: () => {
      // Get all bands from all years
      const bandPages = Object.values(bands).flatMap((yearBands) =>
        yearBands.map((band) => ({
          url: `/programma/${band.lookupName}`,
          changefreq: "yearly",
          priority: 0.8,
        })),
      );

      return [
        {
          url: "/",
          changefreq: "yearly",
          priority: 1,
        },
        {
          url: "/programma",
          changefreq: "yearly",
          priority: 0.9,
        },
        ...bandPages,
      ];
    },
  },

  site: {
    url: "https://www.izegemklinkt.be",
  },

  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
  },

  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: "2025-07-10",
});
