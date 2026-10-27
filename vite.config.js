import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The LavaLust backend lives in ../backend. Requests to /api are sent to
// index.php directly, so they work even if Apache's mod_rewrite is off.
// /uploads serves the photo files as they are.
const BACKEND = 'http://localhost/eco-bin/backend/public'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: BACKEND,
        changeOrigin: true,
        rewrite: (path) => `/index.php${path}`,
      },
      '/uploads': { target: BACKEND, changeOrigin: true },
    },
  },
})