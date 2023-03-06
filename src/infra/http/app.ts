import { resolve } from 'path'

import type { Server } from 'http'
import { createServer } from 'http'
import express from 'express'
import { Server as WebSocketServer } from 'socket.io'

import cookieParser from 'cookie-parser'

import { initializeRoutes } from './routes/index'

export const setupServer = (): Server => {
  const app = express()
  
  app.use(cookieParser(process.env.SESSION_SECRET!))
  app.set('view engine', 'ejs')
  app.set('views', 'views/pages')
  
  app.use('/static', express.static(resolve(__dirname, '../../..', 'static')))
  
  app.use(express.urlencoded({
    extended: true
  }))
  
  initializeRoutes(app)

  return createServer(app)
}

export const setupWebSocket = (httpServer: Server) => {
  const wsServer = new WebSocketServer(httpServer)
  
  const UUID_REGEX = /^\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

  const dynamicNs = wsServer.of(UUID_REGEX)
  dynamicNs.on('connection', (socket) => {
    const ns = socket.nsp

    socket.on('sendMessage', (params) => {
      ns.emit('messageReceived', params)
    })
  })
}
