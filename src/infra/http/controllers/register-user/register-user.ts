import type { RegisterUserUseCase } from '@application/use-cases/register-user/register-user'
import type { RegisterUserValidator } from '@application/use-cases/register-user/register-user-validator'

import type { SessionService } from '@infra/http/interfaces/session-service'

import { infraErrors, kInvalidBody } from '@infra/http/errors'
import { applicationErrors } from '@application/errors'

import { renderTemplate } from '@infra/http/helpers/http-helper'

type RegisterUserController = Controller<{
  sessionService: SessionService
  registerUserUseCase: RegisterUserUseCase
  registerUserValidator: RegisterUserValidator
}>

export const registerUserControllerFactory: RegisterUserController = ({
  sessionService,
  registerUserUseCase,
  registerUserValidator,
}) => {
  return async ({ body, cookies }) => {
    const userData = registerUserValidator.safeParse(body)
    if (!userData.success) {
      return renderTemplate({
        view: 'error',
        data: {
          error: infraErrors[kInvalidBody],
          goBack: 'register',
        },
      })
    }

    const userSession = await registerUserUseCase(userData.data)
    if (userSession.isLeft()) {
      return renderTemplate({
        view: 'register',
        data: {
          ...userData.data,
          error: applicationErrors[userSession.value],
        },
      })
    }

    cookies.set('session_id', sessionService.formatSession(userSession.value))

    return renderTemplate({ redirect: '/', cookies })
  }
}
