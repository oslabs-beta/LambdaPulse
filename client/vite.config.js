import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/getTraces': 'http://localhost:3000/',
      "/clearTraces": "http://localhost:3000/",
      '/api': 'http://localhost:3000/',
      '/blahblah': 'http://localhost:3000/',
      '/createUser': 'http://localhost:3000/',
      '/verifyUser': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      // 'http://localhost:3000/',
      '/logout': 'http://localhost:3000/',
      '/setUserARN': 'http://localhost:3000/',
      '/getCurrentArn': 'http://localhost:3000/'
    },
  },
  plugins: [react()],
  define: {
    captchaKey:`"${process.env.VITE_CAPTCHA_KEY}"`
  }
});
