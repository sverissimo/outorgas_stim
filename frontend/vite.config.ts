import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  server: {
    proxy: {
      '/api': {
        target: "http://localhost:5000/",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    },
    port: 3006,
  },
  plugins:
    [
      react()
    ]
})
