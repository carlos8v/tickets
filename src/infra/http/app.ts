import { resolve } from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'

import { initializeRoutes } from './routes/index'

export const app = express()

app.use(cookieParser(process.env.SESSION_SECRET!))

app.use('/assets', express.static(resolve(__dirname, '../../..', 'public/assets')))

app.use(express.json())

initializeRoutes(app)
