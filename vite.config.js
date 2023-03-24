import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solidPlugin()],
  root: './views',
  build: {
    target: 'esnext',
    outDir: '../public',
    emptyOutDir: true,
  },
})
