import type { RegisterUserUseCase } from '@application/use-cases/register-user/register-user'
import type { RegisterUserValidator } from '@application/use-cases/register-user/register-user-validator'

import { ok, badRequest } from '@infra/http/helpers/http-helper'

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
      return badRequest('/register', { data: { error: 'Invalid user body' } })
    }

    const sessionId = await registerUserUseCase(userData.data)
    cookies.set('session_id', sessionId)

    return ok('/', { cookies })
  }
}
