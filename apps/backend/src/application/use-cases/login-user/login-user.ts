import type { Either } from '@domain/utils/either'
import { left, right } from '@domain/utils/either'

import type { SessionModel } from '@domain/session'
import { makeSession } from '@domain/session'

import type { UserModel } from '@domain/user'
import { comparePassword } from '@domain/user'

import type { UserRepository } from '@application/interfaces/user-repository'
import type { SessionRepository } from '@application/interfaces/session-repository'

import type { LoginUserSchema } from './login-user-validator'

import { kInvalidUser, kInvalidUserCredentials } from '@application/errors'

type LoginUserUseCaseFactory = UseCase<
  {
    userRepository: UserRepository
    sessionRepository: SessionRepository
  },
  LoginUserSchema,
  Promise<
    Either<
      typeof kInvalidUser | typeof kInvalidUserCredentials,
      SessionModel
    >
  >
>

export const loginUserUseCaseFactory: LoginUserUseCaseFactory = ({
  userRepository,
  sessionRepository,
}) => {
  return async ({ email, password }) => {
    const user = await userRepository.findByEmail(email)
    if (!user?.id) return left(kInvalidUser)

    const correctPass = await comparePassword(password, user.password)
    if (!correctPass) return left(kInvalidUserCredentials)

    const session = makeSession({ user })
    await sessionRepository.save(session)

    const { password: _, ...safeUser } = user

    return right({ ...session, user: safeUser })
  }
}
