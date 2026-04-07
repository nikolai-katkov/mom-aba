import { defineConfig, mergeConfig } from 'vitest/config'

import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    root: '.',
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './tests/setup.ts',
      css: true,
      forbidOnly: !!process.env.CI,
      include: ['tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: ['node_modules/', 'tests/', '**/*.config.ts', 'src/main.tsx', 'dist/'],
        thresholds: {
          lines: 80,
          functions: 80,
          branches: 77,
          statements: 80,
        },
      },
    },
  })
)
