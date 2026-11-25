import { copyFileSync, createReadStream, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { defineConfig } from 'vite';

function videosAssetPlugin() {
  const videosDir = resolve('videos');
  let outDir = 'dist';
  let base = '/';

  return {
    name: 'travbud-videos-asset',
    configResolved(config) {
      outDir = config.build.outDir;
      base = config.base.endsWith('/') ? config.base : `${config.base}/`;
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const prefix = `${base}videos/`;
        if (!req.url || !req.url.startsWith(prefix)) return next();
        const fileName = decodeURIComponent(req.url.slice(prefix.length).split('?')[0]);
        if (!fileName || fileName.includes('..') || fileName.includes('/')) return next();
        const filePath = join(videosDir, fileName);
        if (!existsSync(filePath) || !statSync(filePath).isFile()) return next();
        res.setHeader('Content-Type', fileName.endsWith('.mp4') ? 'video/mp4' : 'application/octet-stream');
        res.setHeader('Content-Length', statSync(filePath).size);
        if (req.method === 'HEAD') return res.end();
        createReadStream(filePath).pipe(res);
      });
    },
    closeBundle() {
      if (!existsSync(videosDir)) return;
      const targetDir = resolve(outDir, 'videos');
      mkdirSync(targetDir, { recursive: true });
      for (const entry of readdirSync(videosDir)) {
        if (!entry.toLowerCase().endsWith('.mp4')) continue;
        copyFileSync(join(videosDir, entry), join(targetDir, entry));
      }
    },
  };
}

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [videosAssetPlugin()],
});