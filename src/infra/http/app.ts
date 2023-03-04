import { resolve } from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'

import { initializeRoutes } from './routes/index'

export const app = express()

app.use(cookieParser(process.env.SESSION_SECRET!))
app.set('view engine', 'ejs')
app.set('views', 'views/pages')

app.use('/static', express.static(resolve(__dirname, '../../..', 'static')))

app.use(express.urlencoded({
  extended: true
}))

initializeRoutes(app)
