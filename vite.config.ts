import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

export default defineConfig({
  root: resolve(__dirname),
  base: './',
  resolve: {
    alias: {
      '@/dui': resolve(__dirname, 'src/lib'),
      '@': resolve(__dirname, 'src'),
    },
    dedupe: ['react', 'react-dom'],
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    assetsInlineLimit: 8192,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        /**
         * One chunk per component, not one per file.
         *
         * Every panel's live view, examples and props table are imported
         * lazily, which left Rollup emitting three chunks per component and
         * close to six hundred files — more requests than the saving is worth,
         * and enough duplicated shared code to make the build larger overall
         * than the single monolith it replaced.
         *
         * Grouping by the component's own directory gives one chunk per panel:
         * the three files are always wanted together, and nothing else wants
         * them. Everything a panel shares with its neighbours still falls out
         * into a common chunk, which is Rollup's default behaviour and the
         * right one here.
         */
        manualChunks(id) {
          const path = id.replace(/\\/g, '/');
          /*
            Vite's preload helper, pinned somewhere harmless.

            Left to Rollup it was placed inside the monaco chunk — and since
            the entry imports the helper to perform any dynamic import at all,
            that made the entry statically import 4.2 MB of Monaco. Monaco was
            lazily loaded and eagerly downloaded at the same time, which looks
            exactly like lazy-loading not working and is very hard to see: the
            only trace is a one-line `import{_ as yy}from"./monaco-editor…"` at
            the top of the entry chunk.

            It belongs with the library chunk, which every other chunk already
            depends on, so this costs no extra request.
          */
          if (path.includes('vite/preload-helper')) return 'dui-lib';
          if (path.includes('node_modules/monaco-editor')) return 'monaco-editor';
          /*
            The library and the icon set, named explicitly.
            Left to itself, Rollup folded all of src/lib into whichever panel
            chunk happened to reach it first — which made `panel-chipsview`
            886 KB, preloaded on every first paint, and liable to jump to a
            different panel's name the day ChipView moved. Every panel needs
            the library, so it is one shared chunk and says so.
          */
          if (path.includes('/src/lib/') || path.includes('/src/icons/')) return 'dui-lib';
          const component = path.match(/\/src\/showcase\/components\/([^/]+)\//);
          if (component) return `panel-${component[1]}`;
          return undefined;
        },
      },
    },
  },
  plugins: [react(), tailwindcss()],
});
