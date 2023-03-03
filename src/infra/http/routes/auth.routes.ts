import { Router } from 'express'

import { expressRouteAdapter } from '../adapters/express-route-adapter'

import { loginUserController } from '../controllers/login-user'
import { registerUserController } from '../controllers/register-user'

export const authRouter = Router()

authRouter.get('/login', (_, res) => res.render('login'))
authRouter.get('/register', (_, res) => res.render('register'))

authRouter.post('/login', expressRouteAdapter(loginUserController))
authRouter.post('/register', expressRouteAdapter(registerUserController))
