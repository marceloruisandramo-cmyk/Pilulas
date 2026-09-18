import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          artigos: path.resolve(__dirname, 'artigos.html'),
          categorias: path.resolve(__dirname, 'categorias.html'),
          sobre: path.resolve(__dirname, 'sobre.html'),
          contacto: path.resolve(__dirname, 'contacto.html'),
          notfound: path.resolve(__dirname, '404.html'),
          adminIndex: path.resolve(__dirname, 'admin/index.html'),
          adminNovo: path.resolve(__dirname, 'admin/novo-artigo.html'),
          adminModelo: path.resolve(__dirname, 'admin/modelo-artigo.html'),
          artigo1: path.resolve(__dirname, 'artigos/origem-martelo-juizes.html'),
          artigo2: path.resolve(__dirname, 'artigos/deusa-temis-venda-olhos.html'),
          artigo3: path.resolve(__dirname, 'artigos/julgamento-de-socrates.html'),
          artigo4: path.resolve(__dirname, 'artigos/regra-de-miranda-aviso.html'),
          artigo5: path.resolve(__dirname, 'artigos/historia-habeas-corpus.html'),
          artigo6: path.resolve(__dirname, 'artigos/lei-armaduras-parlamento-britanico.html'),
          artigo7: path.resolve(__dirname, 'artigos/caso-donoghue-stevenson-caramujo.html'),
          artigo8: path.resolve(__dirname, 'artigos/historia-perucas-tribunais.html'),
          artigo9: path.resolve(__dirname, 'artigos/julgamentos-animais-idade-media.html'),
          artigo10: path.resolve(__dirname, 'artigos/in-dubio-pro-reo-origem.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
