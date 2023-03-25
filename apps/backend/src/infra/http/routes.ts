import type { Express } from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { router, createContext } from './adapters/trpc'

import { me } from './controllers/me'
import { loginUser } from './controllers/login-user'
import { registerUser } from './controllers/register-user'

const appRouter = router({
  me,
  loginUser: loginUser,
  registerUser
})

export type AppRouter = typeof appRouter;

export function initializeRoutes(app: Express) {
  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      createContext,
      router: appRouter,
    }),
  )
}
