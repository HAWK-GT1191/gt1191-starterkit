import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    emptyOutDir: true,
    outDir: '../dist',
    assetsDir: 'assets',
  },
  assetsInclude: ['./assets/**/*'],
});
