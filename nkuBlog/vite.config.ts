import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    'host': '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://api.cycodes.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace('/api', '')
      },
      '/srcp': {
        target: 'http://src.cycodes.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace('/srcp', '/src')
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
