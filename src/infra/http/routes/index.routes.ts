import { Router } from 'express'

import { expressRouteAdapter, expressMiddlewareAdapter } from '../adapters/express-route-adapter'

import { authenticateUserMiddleware } from '../middlewares/authenticate-user'

import { indexPage } from '../controllers/index'
import { chatPage } from '../controllers/chat'

export const indexRouter = Router()

indexRouter.get(
  '/',
  expressMiddlewareAdapter(authenticateUserMiddleware),
  expressRouteAdapter(indexPage)
)

indexRouter.get(
  '/chat/:id',
  expressRouteAdapter(chatPage)
)
