import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';

// Library build for npm publishing — separate from vite.config.ts (the
// showcase app). Multi-entry so each package.json "exports" subpath gets its
// own chunk: importing "." never pulls in monaco-setup's code, and vice
// versa. @monaco-editor/react and monaco-editor are externalized (not
// inlined) — they stay the consumer's responsibility, matching the
// peerDependenciesMeta.optional contract.
//
// The "style" entry exists only to pull in src/index.css (Tailwind v4
// CSS-first theme) into the same combined CSS output as every component's
// own .css import — cssCodeSplit:false merges them all into one dist/style.css.
// It produces a near-empty dist/style.js side-effect file that package.json
// intentionally never references — only dist/style.css is a public export.
export default defineConfig({
  plugins: [
    tailwindcss(),
    dts({
      entryRoot: 'src',
      include: ['src/index.ts', 'src/icons/**/*.tsx', 'src/lib/**/*.ts', 'src/lib/**/*.tsx', 'src/monaco-setup.ts', 'src/*.d.ts'],
      outDir: 'dist',
      rollupTypes: false,
      insertTypesEntry: false,
    }),
  ],
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: false,
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        style: resolve(__dirname, 'src/css-entry.ts'),
        'monaco-setup': resolve(__dirname, 'src/monaco-setup.ts'),
        'theme/core': resolve(__dirname, 'src/lib/theme/core.ts'),
        'theme/utils': resolve(__dirname, 'src/lib/theme/utils.ts'),
        'theme/editor': resolve(__dirname, 'src/lib/theme/editor.tsx'),
      },
      formats: ['es'],
      cssFileName: 'style',
    },
    rollupOptions: {
      // Exact-string matching in an array misses deep sub-path imports like
      // 'monaco-editor/esm/vs/language/typescript/ts.worker?worker&inline'
      // (used for self-hosted workers in monaco-setup.ts) — without prefix
      // matching, Monaco's own ~7MB worker source gets physically bundled
      // into our dist, defeating "Monaco is the consumer's responsibility".
      external: (id) =>
        id === 'react' || id === 'react-dom' || id === 'react/jsx-runtime' || id === 'zustand' ||
        id === '@monaco-editor/react' || id.startsWith('@monaco-editor/react/') ||
        id === 'monaco-editor' || id.startsWith('monaco-editor/'),
      output: {
        preserveModules: false,
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
    minify: 'esbuild',
  },
});
