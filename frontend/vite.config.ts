import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: "http://[::ffff:127.0.0.1]:5000/",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    },
    port: 3006,
  },

  plugins: [react()]
})