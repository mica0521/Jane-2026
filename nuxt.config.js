import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  srcDir: 'app/',
  dir: {
    public: resolve(__dirname, 'public')
  },
  nitro: { preset: 'static', prerender: { routes: ['/home', '/about', '/project', '/projectDetail', '/contact'] } },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  experimental: {
    appManifest: false
  },
  modules: [
    '@element-plus/nuxt'
  ]
})
