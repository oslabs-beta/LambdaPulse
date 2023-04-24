import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/getTraces': 'http://localhost:3000/',
      "/clearTraces": "http://localhost:3000/",
      '/api': 'http://localhost:3000/',
      '/blahblah': 'http://localhost:3000/',
      '/createUser': 'http://localhost:3000/',
      '/verifyUser': 'http://localhost:3000/',
      '/logout': 'http://localhost:3000/'
    },
  },
  plugins: [react()],
  define: {
    captchaKey:`"${process.env.VITE_CAPTCHA_KEY}"`
  }
});
