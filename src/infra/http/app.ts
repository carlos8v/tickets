import type { Server } from 'http'
import type { Express } from 'express'

import { resolve } from 'path'
import express from 'express'
import { Server as WebSocketServer } from 'rpc-websockets'

import cookieParser from 'cookie-parser'

import { initializeRoutes } from './routes/index'

export const setupServer = (): Express => {
  const app = express()
  
  app.use(cookieParser(process.env.SESSION_SECRET!))
  app.set('view engine', 'ejs')
  app.set('views', 'views/pages')
  
  app.use('/static', express.static(resolve(__dirname, '../../..', 'static')))
  
  app.use(express.urlencoded({
    extended: true
  }))
  
  initializeRoutes(app)

  return app
}

export const setupWebSocket = (server: Server) => {
  const wsServer = new WebSocketServer({ server })

  wsServer.register('sum', (params) => {
    const [n1, n2] = params as number[]
    return n1 + n2
  })
}
