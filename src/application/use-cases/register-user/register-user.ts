import type { Either } from '@domain/utils/either'
import { left, right } from '@domain/utils/either'

import type { SessionModel } from '@domain/session'
import { makeSession } from '@domain/session'
import { makeUser, hashPass } from '@domain/user'

import type { UserRepository } from '@application/interfaces/user-repository'
import type { SessionRepository } from '@application/interfaces/session-repository'

import type { RegisterUserSchema } from './register-user-validator'

import {
  kUserAlreadyExists,
  kInvalidUserCredentials,
  kMismatchingUserPass,
} from '@application/errors'

type RegisterUserUseCaseFactory = UseCase<
  {
    userRepository: UserRepository
    sessionRepository: SessionRepository
  },
  RegisterUserSchema,
  Promise<
    Either<
      | typeof kUserAlreadyExists
      | typeof kInvalidUserCredentials
      | typeof kMismatchingUserPass,
      SessionModel
    >
  >
>
export type RegisterUserUseCase = ReturnType<RegisterUserUseCaseFactory>

export const registerUserUseCaseFactory: RegisterUserUseCaseFactory = ({
  userRepository,
  sessionRepository,
}) => {
  return async (userData: RegisterUserSchema) => {
    if (userData.password !== userData.confirmPassword)
      return left(kMismatchingUserPass)

    const userAlreadyExists = await userRepository.findByEmail(userData.email)
    if (userAlreadyExists?.id) return left(kUserAlreadyExists)

    const cryptPass = await hashPass(userData.password)

    const user = makeUser({
      email: userData.email,
      name: userData.name,
      password: cryptPass,
    })
    await userRepository.save(user)

    const session = makeSession({ userId: user.id })
    await sessionRepository.save(session)

    return right(session)
  }
}
