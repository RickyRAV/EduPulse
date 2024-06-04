// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    'nuxt-lucide-icons',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    "@nuxt/image"
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  experimental: {
    componentIslands: true,
  },
  supabase: {
    redirect: false
  }
})