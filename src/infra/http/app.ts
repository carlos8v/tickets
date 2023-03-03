import { resolve } from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'

import { initializeRoutes } from './routes/index'

export const app = express()

app.use(cookieParser())
app.set('view engine', 'ejs')
app.set('views', 'public/pages')

app.use('/static', express.static(resolve(__dirname, '../../..', 'public', 'static')))
app.use('/styles', express.static(resolve(__dirname, '../../..', 'public', 'styles')))

app.use(express.urlencoded({
  extended: true
}))

initializeRoutes(app)
