import { makeUser, hashPass } from '@domain/user'
import { makeSession } from '@domain/session'

import type { UserRepository } from '@application/interfaces/user-repository'
import type { SessionRepository } from '@application/interfaces/session-repository'

import type { RegisterUserSchema } from './register-user-validator'

type RegisterUserUseCaseFactory = UseCase<
  {
    userRepository: UserRepository
    sessionRepository: SessionRepository
  },
  RegisterUserSchema,
  Promise<string>
>
export type RegisterUserUseCase = ReturnType<RegisterUserUseCaseFactory>

export const registerUserUseCaseFactory: RegisterUserUseCaseFactory = ({
  userRepository,
  sessionRepository
}) => {
  return async (userData: RegisterUserSchema) => {
    if (userData.password !== userData.confirmPassword) {
      throw new Error('Password mismatching')
    }

    const cryptPass = await hashPass(userData.password)

    const user = makeUser({
      email: userData.email,
      name: userData.name,
      password: cryptPass,
    })
    await userRepository.save(user)

    const session = makeSession({ userId: user.id })
    await sessionRepository.save(session)

    return session.id
  }
}
