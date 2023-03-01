import { resolve } from 'path'
import express from 'express'
import { initializeRoutes } from './routes/index'

export const app = express()

app.set('view engine', 'ejs')
app.set('views', 'public/pages')
app.use('/styles', express.static(resolve(__dirname, '..', '..', '..', 'public', 'styles')))

app.use(express.urlencoded({
  extended: true
}))

app.get('/', (req, res) => res.render('index'))

initializeRoutes(app)
