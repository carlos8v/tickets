import { router } from './adapters/trpc'

import { me } from './controllers/me'
import { loginUser } from './controllers/login-user'
import { registerUser } from './controllers/register-user'

export const appRouter = router({
  me,
  loginUser,
  registerUser
})

export type AppRouter = typeof appRouter
