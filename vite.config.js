
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const BACKEND = 'http://localhost/eco-bin/backend/public'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: BACKEND,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/index.php'),
      },
      '/uploads': {
        target: BACKEND,
        changeOrigin: true,
      },
    },
  },
})
;