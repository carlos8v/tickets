import express from 'express'

export const server = express()

server.use(express.json())

server.set('view engine', 'ejs')
server.set('views', 'src/pages')

server.get('/', (req, res) => res.render('index'))
server.get('/login', (req, res) => res.render('login'))
