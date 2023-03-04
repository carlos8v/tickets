import type { AuthenticateUseUseCase } from '@application/use-cases/authenticate-user/authenticate-user'
import type { SessionService } from '@infra/http/interfaces/session-service'

import { nextMiddleware } from '../../helpers/http-helper'

type AuthenticateUserMiddlewareFactory = Controller<{
  sessionService: SessionService
  authenticateUseUseCase: AuthenticateUseUseCase
}>

export const authenticateUserMiddlewareFactory: AuthenticateUserMiddlewareFactory = ({
  sessionService,
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

    if (cookies.get('session_id') !== session.value.id) {
      cookies.set('session_id', sessionService.formatSession(session.value))
      return nextMiddleware({ cookies })
    }

    return nextMiddleware()
  }
}
