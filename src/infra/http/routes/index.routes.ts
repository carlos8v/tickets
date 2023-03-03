import { Router } from 'express'

import { expressRouteAdapter, expressMiddlewareAdapter } from '../adapters/express-route-adapter'

import { authenticateUserMiddleware } from '../middlewares/authenticate-user'

import { indexPage } from '../controllers/index'

export const indexRouter = Router()

indexRouter.get(
  '/',
  expressMiddlewareAdapter(authenticateUserMiddleware),
  expressRouteAdapter(indexPage)
)
