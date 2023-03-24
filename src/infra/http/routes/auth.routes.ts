import { Router } from 'express'

import { expressRouteAdapter } from '../adapters/express-route-adapter'

import { indexPage } from '../controllers/index'
import { loginUserController } from '../controllers/login-user'
import { registerUserController } from '../controllers/register-user'

export const authRouter = Router()

authRouter.get('/login', expressRouteAdapter(indexPage))
authRouter.get('/register', expressRouteAdapter(indexPage))

authRouter.post('/login', expressRouteAdapter(loginUserController))
authRouter.post('/register', expressRouteAdapter(registerUserController))
