import { comparePassword } from '@domain/user'
import { makeSession } from '@domain/session'

import type { UserRepository } from '@application/interfaces/user-repository'
import type { SessionRepository } from '@application/interfaces/session-repository'

import type { LoginUserSchema } from './login-user-validator'

type LoginUserUseCaseFactory = UseCase<
  {
    userRepository: UserRepository
    sessionRepository: SessionRepository
  },
  LoginUserSchema,
  Promise<string>
>
export type LoginUserUseCase = ReturnType<LoginUserUseCaseFactory>

export const loginUserUseCaseFactory: LoginUserUseCaseFactory = ({
  userRepository,
  sessionRepository
}) => {
  return async ({ email, password }) => {
    const user = await userRepository.findByEmail(email)
    if (!user?.id) throw new Error('Invalid user')

    const correctPass = await comparePassword(password, user.password)
    if (!correctPass) throw new Error('Invalid credentials')

    const session = makeSession({ userId: user.id })
    await sessionRepository.save(session)
    
    return session.id
  }
}
