import { readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'
import { defineConfig } from 'vite'

/**
 * Scans src/public/images/vocabulary/ and exposes served URL paths
 * as a virtual module. Avoids import.meta.glob processing overhead.
 */
function imageManifestPlugin(): Plugin {
  const VOCAB_DIR = join(__dirname, 'src/public/images/vocabulary')
  const PUBLIC_ROOT = join(__dirname, 'src/public')

  function scan(dir: string): string[] {
    const entries = readdirSync(dir, { withFileTypes: true })
    return entries.flatMap(e =>
      e.isDirectory()
        ? scan(join(dir, e.name))
        : e.name.endsWith('.png')
          ? ['/' + relative(PUBLIC_ROOT, join(dir, e.name))]
          : []
    )
  }

  const VIRTUAL_ID = '\0virtual:image-manifest'

  return {
    name: 'image-manifest',
    resolveId(id) {
      if (id === 'virtual:image-manifest') return VIRTUAL_ID
    },
    load(id) {
      if (id !== VIRTUAL_ID) return
      const paths = scan(VOCAB_DIR)
      return `export default ${JSON.stringify(paths)}`
    },
    configureServer(server) {
      server.watcher.add(VOCAB_DIR)
      server.watcher.on('all', (_event, path) => {
        if (path.startsWith(VOCAB_DIR) && path.endsWith('.png')) {
          const mod = server.moduleGraph.getModuleById(VIRTUAL_ID)
          if (mod) {
            server.moduleGraph.invalidateModule(mod)
            server.ws.send({ type: 'full-reload' })
          }
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), imageManifestPlugin()],
  root: 'src',
  build: {
    outDir: '../dist',
    copyPublicDir: false,
  },
  server: {
    allowedHosts: ['.ngrok-free.dev', '.ngrok.io'],
  },
})
