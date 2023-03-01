import type { Express } from 'express'

import { loginRouter } from './login.routes'

export function initializeRoutes(app: Express) {
  app.use(loginRouter)
}
