import path from "path";

const normalizedPath = path
  .resolve(__dirname, "./presets/lara/")
  .replace(/\\/g, "/");

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-primevue"],
  primevue: {
    // unstyled: true,
    importPT: { from: normalizedPath },
    options: { ripple: true },
    components: { include: ["Button"] },
    css: ['primevue/resources/themes/aura-light-green/theme.css']
  },
});
