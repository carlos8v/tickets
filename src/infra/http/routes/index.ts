import type { Express } from 'express'

import { indexRouter } from './index.routes'
import { authRouter } from './auth.routes'

export function initializeRoutes(app: Express) {
  app.use(indexRouter)
  app.use(authRouter)
}
