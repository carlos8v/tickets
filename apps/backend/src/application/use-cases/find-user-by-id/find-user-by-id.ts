import type { Either } from '@domain/utils/either'
import { left, right } from '@domain/utils/either'

import { UserModel } from '@domain/user'

import { UserRepository } from '@application/interfaces/user-repository'
import { kInvalidUser } from '@application/errors'

type FindUserByIdUseCaseFactory = UseCase<
  {
    userRepository: UserRepository
  },
  string,
  Promise<
    Either<
      typeof kInvalidUser,
      Omit<UserModel, 'password'>
    >
  >
>

export const findUserByIdUseCaseFactory: FindUserByIdUseCaseFactory = ({
  userRepository
}) => {
  return async (userId) => {
    const user = await userRepository.findById(userId)
    if (!user?.id) return left(kInvalidUser)

    const { password, ...safeUser } = user

    return right(safeUser)
  }
}
