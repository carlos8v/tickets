import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: './views',
  build: {
    target: 'esnext',
    outDir: '../public',
    emptyOutDir: true,
  },
})
