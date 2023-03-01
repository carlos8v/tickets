import { Router } from 'express'

export const loginRouter = Router()

loginRouter.get('/login', (_, res) => res.render('login'))

loginRouter.post('/login', (req, res) => {
  console.log(req.body)
  return res.status(400).send()
})
