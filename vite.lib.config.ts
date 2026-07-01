import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

export default defineConfig({
  root: resolve(__dirname),
  plugins: [tailwindcss()],
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/css-entry.ts'),
      formats: ['es'],
      fileName: '_css-entry',
    },
    rollupOptions: {
      output: {
        assetFileNames: 'style.css',
      },
    },
    cssMinify: false,
    cssCodeSplit: false,
  },
});
