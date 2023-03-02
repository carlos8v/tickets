import { makeUser, hashPass } from '@domain/user'

import type { UserRepository } from '@application/interfaces/user-repository'
import type { RegisterUserSchema } from './register-user-validator'

type RegisterUserUseCaseBuilder = {
  userRepository: UserRepository
}

export const registerUserUseCaseFactory = ({
  userRepository,
}: RegisterUserUseCaseBuilder) => {
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
  }
}
