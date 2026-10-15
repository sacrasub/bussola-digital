import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
  base: './',
  build: {
    outDir: '../arrais',
    emptyOutDir: true,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'pwa-icon.svg', 'data/questions.json', 'data/flashcards.json'],
      manifest: {
        name: 'Simulado Arrais - Bússola Digital',
        short_name: 'SimuladoArrais',
        description: 'Simulado preparatório oficial para habilitação de Arrais-Amador (Marinha do Brasil)',
        theme_color: '#0B192C',
        background_color: '#0B192C',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: './pwa-icon.svg',
            sizes: '192x192 512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
});
