import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:7921',
        changeOrigin: true,
        rewrite: (path) => path.replace('/api', '/api')
      },
      '/srcp': {
        target: 'http://localhost:7921',
        changeOrigin: true,
        rewrite: (path) => path.replace('/srcp', '/srcp')
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";',

        javascriptEnabled: true
      }
    }
  }
})
