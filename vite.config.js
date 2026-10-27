import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The API is a separate service (see backend/). The browser calls it directly
// at VITE_API_URL, so no dev proxy is needed. Same setup as the product app.
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
})
