import { Router } from 'express'

export const authRouter = Router()

authRouter.get('/login', (_, res) => res.render('login'))
authRouter.get('/register', (_, res) => res.render('register'))

authRouter.post('/register', (req, res) => {
  console.log(req.body)
  return res.status(400).send()
})
