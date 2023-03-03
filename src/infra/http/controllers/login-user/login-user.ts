import type { LoginUserUseCase } from '@application/use-cases/login-user/login-user'
import type { LoginUserValidator } from '@application/use-cases/login-user/login-user-validator'

import { ok, badRequest } from '@infra/http/helpers/http-helper'

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
      return badRequest('/register', { data: { error: 'Invalid user body' } })
    }

    const sessionId = await loginUserUseCase(userData.data)
    cookies.set('session_id', sessionId)

    return ok('index', { cookies })
  }
}
