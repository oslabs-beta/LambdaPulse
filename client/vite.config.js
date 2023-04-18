import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy : {
      "/getTraces": "http://localhost:3000/",
      "/api": "http://localhost:3000/",
      "/blahblah": "http://localhost:3000/",
    },
  },
  plugins: [react()],
});
