import { defineConfig } from "cf/config";

export default defineConfig({
  worker: {
    name: "tamako-market-map",
    compatibilityDate: "2026-11-21",
    workersDev: false,
    domains: ["map.tamako.chius.dev"],
    assets: {
      notFoundHandling: "single-page-application",
      htmlHandling: "auto-trailing-slash",
    },
    observability: {
      enabled: true,
      logs: { enabled: true },
      traces: { enabled: true },
    },
  },
});
