import type { AuthenticateUseUseCase } from '@application/use-cases/authenticate-user/authenticate-user'

import { nextMiddleware } from '../../helpers/http-helper'

type AuthenticateUserMiddlewareFactory = Controller<{
  authenticateUseUseCase: AuthenticateUseUseCase
}>

export const authenticateUserMiddlewareFactory: AuthenticateUserMiddlewareFactory = ({
  authenticateUseUseCase,
}) => {
  return async ({ cookies }) => {
    if (!cookies.has('session_id')) {
      return nextMiddleware({ redirect: '/login' })
    }

    const session = await authenticateUseUseCase(cookies.get('session_id')!)
    if (session.isLeft()) {
      cookies.set('session_id', null)
      return nextMiddleware({ redirect: '/login', cookies })
    }

    return nextMiddleware()
  }
}
