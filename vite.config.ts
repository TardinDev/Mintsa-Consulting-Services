import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'gzip',
      threshold: 1024,
    }),
  ],
  build: {
    outDir: 'dist',
    target: 'es2022',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-router') || id.includes('node_modules/@remix-run')) {
            return 'router';
          }
          if (id.includes('node_modules/styled-components') || id.includes('node_modules/react-icons')) {
            return 'ui';
          }
          if (id.includes('node_modules/@clerk')) {
            return 'clerk';
          }
          if (id.includes('node_modules/zustand')) {
            return 'state';
          }
          if (id.includes('node_modules/lottie-web') || id.includes('node_modules/react-lottie')) {
            return 'lottie';
          }
        },
      },
    },
  },
});
