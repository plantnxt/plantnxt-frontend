import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    // Allow access via app.plantnxt.com
    hmr: {
      host: 'app.plantnxt.com'
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  base: '/',
});
