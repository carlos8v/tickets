import type { LoginUserUseCase } from '@application/use-cases/login-user/login-user'
import type { LoginUserValidator } from '@application/use-cases/login-user/login-user-validator'

import { renderTemplate } from '@infra/http/helpers/http-helper'

import { infraErrors, kInvalidBody } from '@infra/http/errors'
import { applicationErrors } from '@application/errors'

type LoginUserController = Controller<{
  loginUserUseCase: LoginUserUseCase
  loginUserValidator: LoginUserValidator
}>

export const loginUserControllerFactory: LoginUserController = ({
  loginUserUseCase,
  loginUserValidator,
}) => {
  return async ({ body, cookies }) => {
    const userData = loginUserValidator.safeParse(body)
    if (!userData.success) {
      return renderTemplate({
        view: 'error',
        data: {
          error: infraErrors[kInvalidBody],
          goBack: 'login',
        },
      })
    }

    const loggedUser = await loginUserUseCase(userData.data)
    if (loggedUser.isLeft()) {
      return renderTemplate({
        view: 'login',
        data: {
          ...userData.data,
          error: applicationErrors[loggedUser.value],
        },
      })
    }

    cookies.set('session_id', loggedUser.value)

    return renderTemplate({ redirect: '/', cookies })
  }
}
