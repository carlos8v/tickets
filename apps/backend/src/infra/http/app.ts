import express from 'express'
import cookieParser from 'cookie-parser'

import { initializeRoutes } from './routes'

export const app = express()

app.use(cookieParser(process.env.SESSION_SECRET!))

app.use(express.json())

initializeRoutes(app)
