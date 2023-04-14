import { router } from './adapters/trpc'

import { me } from './controllers/me'
import { loginUser } from './controllers/login-user'
import { logoutUser } from './controllers/logout-user'
import { registerUser } from './controllers/register-user'
import { findAllTickets } from './controllers/find-all-tickets'
import { findAllUsers } from './controllers/find-all-users'

export const appRouter = router({
  me,
  loginUser,
  logoutUser,
  registerUser,
  findAllTickets,
  findAllUsers
})

export type AppRouter = typeof appRouter
