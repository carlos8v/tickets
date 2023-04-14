import { router } from './adapters/trpc'

import { me } from './controllers/me'
import { loginUser } from './controllers/login-user'
import { registerUser } from './controllers/register-user'
import { findAllTickets } from './controllers/find-all-tickets'

export const appRouter = router({
  me,
  loginUser,
  registerUser,
  findAllTickets,
})

export type AppRouter = typeof appRouter
