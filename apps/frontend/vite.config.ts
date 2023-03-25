import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  const {
    API_URL,
    VITE_PORT = 3000
  } = loadEnv(mode, process.cwd(), '')

  return defineConfig({
    plugins: [react()],
    server: {
      port: Number(VITE_PORT),
      proxy: {
        '/api': {
          target: API_URL,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
  })
}
