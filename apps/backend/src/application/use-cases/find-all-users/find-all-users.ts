import type { UserModel } from '@domain/user'

import { UserRepository } from '@application/interfaces/user-repository'

type FindAllUsersUseCaseFactory = UseCase<
  { userRepository: UserRepository },
  {
    name?: string,
    email?: string
  },
  Promise<UserModel[]>
>

export const findAllUsersUseCaseFactory: FindAllUsersUseCaseFactory = ({
  userRepository
}) => {
  return async ({
    name = '',
    email = ''
  }) => {
    const users = await userRepository.findManyBy({
      name,
      email
    })

    return users
  }
}
