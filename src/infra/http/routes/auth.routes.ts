import { Router } from 'express'

import { expressRouteAdapter } from '../adapters/express-route-adapter'

import { loginUserController, loginUserPage } from '../controllers/login-user'
import { registerUserController, registerUserPage } from '../controllers/register-user'

export const authRouter = Router()

authRouter.get('/login', expressRouteAdapter(loginUserPage))
authRouter.get('/register', expressRouteAdapter(registerUserPage))

authRouter.post('/login', expressRouteAdapter(loginUserController))
authRouter.post('/register', expressRouteAdapter(registerUserController))
