import { prisma } from '@infra/db/prisma/prisma-client'
import { prismaUserRepositoryFactory } from '@infra/db/prisma/repositories/user-repository'
import { prismaSessionRepositoryFactory } from '@infra/db/prisma/repositories/session-repository'

import { registerUserUseCaseFactory } from '@application/use-cases/register-user/register-user'
import { registerUserSchema } from '@application/use-cases/register-user/register-user-validator'

import { registerUserControllerFactory } from './register-user'
import { registerUserPageFactory } from './register-user-page'

const registerUserUseCase = registerUserUseCaseFactory({
  userRepository: prismaUserRepositoryFactory(prisma),
  sessionRepository: prismaSessionRepositoryFactory(prisma)
})

export const registerUserController = registerUserControllerFactory({
  registerUserUseCase,
  registerUserValidator: registerUserSchema
})

export const registerUserPage = registerUserPageFactory()
