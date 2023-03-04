import { setupServer, setupWebSocket } from './app'

const port = process.env.PORT || 3333
const app = setupServer()
const server = app.listen(port, () => console.log(`Server started at port ${port}`))
setupWebSocket(server)

const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']
signalTraps.forEach((type) => process.on(type, gracefulShutdown))

async function gracefulShutdown() {
  server.close()
  process.exit(0)
}
