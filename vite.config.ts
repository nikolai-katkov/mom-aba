import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  root: 'src',
  build: {
    outDir: '../dist',
  },
  server: {
    allowedHosts: ['.ngrok-free.dev', '.ngrok.io'],
  },
})
