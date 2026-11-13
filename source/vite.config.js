import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { createReadStream, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(here, '..')

// The 372 clips and the music live at the repo root next to the built
// index.html. Serve them from there in dev rather than copying them in.
function mediaFromRepoRoot() {
  return {
    name: 'media-from-repo-root',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = decodeURIComponent((req.url || '').split('?')[0])
        if (!/\.(m4a|mp3)$/i.test(path)) return next()
        const file = resolve(repoRoot, '.' + path)
        if (!file.startsWith(repoRoot) || !existsSync(file)) return next()
        res.setHeader('Content-Type', path.endsWith('.mp3') ? 'audio/mpeg' : 'audio/mp4')
        createReadStream(file).pipe(res)
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), viteSingleFile(), mediaFromRepoRoot()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 100000000,
    cssCodeSplit: false,
  },
})
