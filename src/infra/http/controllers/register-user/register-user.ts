import type { RegisterUserUseCase } from '@application/use-cases/register-user/register-user'
import type { RegisterUserValidator } from '@application/use-cases/register-user/register-user-validator'

import { applicationErrors } from '@application/errors'

import { renderTemplate } from '@infra/http/helpers/http-helper'

type RegisterUserController = Controller<{
  registerUserUseCase: RegisterUserUseCase
  registerUserValidator: RegisterUserValidator
}>

export const registerUserControllerFactory: RegisterUserController = ({
  registerUserUseCase,
  registerUserValidator
}) => {
  return async ({ body, cookies }) => {
    const userData = registerUserValidator.safeParse(body)
    if (!userData.success) {
      return renderTemplate('error', {
        data: {
          error: 'Invalid user body'
        }
      })
    }

    const newUser = await registerUserUseCase(userData.data)
    if (newUser.isLeft()) {
      return renderTemplate('register', {
        data: {
          ...userData.data,
          error: applicationErrors[newUser.value]
        }
      })
    }

    cookies.set('session_id', newUser.value)

    return renderTemplate('index', { cookies })
  }
}
