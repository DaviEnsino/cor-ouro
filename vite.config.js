import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default {
  root: './',
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ml_g: resolve(__dirname, 'ml-g.html'),
        g_kg: resolve(__dirname, 'g-kg.html'),
        kg_t: resolve(__dirname, 'kg-t.html'),
      },
    },
  },
};