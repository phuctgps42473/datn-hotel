import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import tailwindcss from '@tailwindcss/vite' // <-- XÓA DÒNG NÀY HOẶC BIẾN NÓ THÀNH COMMENT
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // tailwindcss(), // <-- XÓA DÒNG NÀY HOẶC BIẾN NÓ THÀNH COMMENT
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})