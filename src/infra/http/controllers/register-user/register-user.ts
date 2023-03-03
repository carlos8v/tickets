import type { RegisterUserUseCase } from '@application/use-cases/register-user/register-user'
import type { RegisterUserValidator } from '@application/use-cases/register-user/register-user-validator'

import { infraErrors, kInvalidBody } from '@infra/http/errors'
import { applicationErrors } from '@application/errors'

import { renderTemplate } from '@infra/http/helpers/http-helper'

type RegisterUserController = Controller<{
  registerUserUseCase: RegisterUserUseCase
  registerUserValidator: RegisterUserValidator
}>

export const registerUserControllerFactory: RegisterUserController = ({
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

    const newUser = await registerUserUseCase(userData.data)
    if (newUser.isLeft()) {
      return renderTemplate({
        view: 'register',
        data: {
          ...userData.data,
          error: applicationErrors[newUser.value],
        },
      })
    }

    cookies.set('session_id', newUser.value)

    return renderTemplate({ redirect: '/', cookies })
  }
}
