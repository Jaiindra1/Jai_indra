import{defineConfig}from'vite';
import react from '@vitejs/plugin-react';
const target = process.env.DEALSENSE_BACKEND_URL || 'http://127.0.0.1:5000';
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { target, changeOrigin: true },
      '/static': { target, changeOrigin: true },
      '^/product/': { target, changeOrigin: true },
    },
  },
});
