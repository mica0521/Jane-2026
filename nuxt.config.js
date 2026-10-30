import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  srcDir: 'app/',
  serverDir: resolve(__dirname, 'server'),
  dir: {
    public: resolve(__dirname, 'public')
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  experimental: {
    appManifest: false
  },
  modules: [
    '@element-plus/nuxt'
  ]
})
