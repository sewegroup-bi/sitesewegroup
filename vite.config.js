// Vite config — site multi-página (MPA).
// Cada .html da raiz é um ponto de entrada; o build sai em dist/.
import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Todas as páginas .html da raiz viram entradas do build.
const pages = Object.fromEntries(
  fs.readdirSync(__dirname)
    .filter(f => f.endsWith('.html'))
    .map(f => [f.replace(/\.html$/, ''), resolve(__dirname, f)])
);

// Em dev/preview, simula o cleanUrls do Vercel: /distribuidor -> /distribuidor.html
function cleanUrls() {
  const rewrite = (req, _res, next) => {
    const url = (req.url || '').split('?')[0];
    if (url !== '/' && !url.includes('.') && fs.existsSync(resolve(__dirname, url.slice(1) + '.html'))) {
      req.url = url + '.html' + (req.url.includes('?') ? '?' + req.url.split('?')[1] : '');
    }
    next();
  };
  return {
    name: 'clean-urls',
    configureServer(server) { server.middlewares.use(rewrite); },
    configurePreviewServer(server) { server.middlewares.use(rewrite); },
  };
}

export default defineConfig({
  plugins: [cleanUrls()],
  build: {
    outDir: 'dist',
    rollupOptions: { input: pages },
  },
});
