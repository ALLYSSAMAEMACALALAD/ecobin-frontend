import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

<<<<<<< HEAD
// The API is a separate service (see backend/). The browser calls it directly
// at VITE_API_URL, so no dev proxy is needed. Same setup as the product app.
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
})
=======
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
>>>>>>> bf6876afffd8f0bdf8ee883db8ef30593a2e3e97
