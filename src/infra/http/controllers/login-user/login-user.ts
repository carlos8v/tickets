import type { LoginUserUseCase } from '@application/use-cases/login-user/login-user'
import type { LoginUserValidator } from '@application/use-cases/login-user/login-user-validator'

import type { SessionService } from '@infra/http/interfaces/session-service'
import { send } from '@infra/http/helpers/http-helper'

import { infraErrors, kInvalidBody } from '@infra/http/errors'
import { applicationErrors } from '@application/errors'

type LoginUserController = Controller<{
  sessionService: SessionService
  loginUserUseCase: LoginUserUseCase
  loginUserValidator: LoginUserValidator
}>

export const loginUserControllerFactory: LoginUserController = ({
  sessionService,
  loginUserUseCase,
  loginUserValidator,
}) => {
  return async ({ body, cookies }) => {
    const userData = loginUserValidator.safeParse(body)
    if (!userData.success) {
      return send({
        data: {
          error: infraErrors[kInvalidBody],
          goBack: 'login',
        },
      })
    }

    const userSession = await loginUserUseCase(userData.data)
    if (userSession.isLeft()) {
      return send({
        data: {
          ...userData.data,
          error: applicationErrors[userSession.value],
        },
      })
    }

    cookies.set('session_id', sessionService.formatSession(userSession.value))

    return send({ redirect: '/', cookies })
  }
}
