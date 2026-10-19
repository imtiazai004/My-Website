import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          profitscout: resolve(__dirname, 'profitscout.html'),
          profitscoutPrivacy: resolve(__dirname, 'profitscout-privacy.html'),
        },
        output: {
          manualChunks(id) {
            // Split Firebase so public pages load only app + Firestore;
            // Auth and Storage are admin-only and stay in their own chunks.
            if (/node_modules\/@?firebase\/auth/.test(id)) return 'firebase-auth'
            if (/node_modules\/@?firebase\/storage/.test(id)) return 'firebase-storage'
            if (/node_modules\/@?firebase\//.test(id)) return 'firebase'
            if (id.includes('node_modules/framer-motion') || id.includes('node_modules/motion')) {
              return 'motion'
            }
          },
        },
      },
    },
  };
});
