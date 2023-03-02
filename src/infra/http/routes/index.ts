import type { Express } from 'express'

import { authRouter } from './auth.routes'

export function initializeRoutes(app: Express) {
  app.get('/', (_, res) => res.render('index'))

  app.use(authRouter)
}
