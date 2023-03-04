import { prisma } from '@infra/db/prisma/prisma-client'
import { prismaUserRepositoryFactory } from '@infra/db/prisma/repositories/user-repository'
import { prismaSessionRepositoryFactory } from '@infra/db/prisma/repositories/session-repository'

import { sessionService } from '@infra/http/services/session-service'

import { loginUserUseCaseFactory } from '@application/use-cases/login-user/login-user'
import { loginUserSchema } from '@application/use-cases/login-user/login-user-validator'

import { loginUserControllerFactory } from './login-user'
import { loginUserPageFactory } from './login-user-page'

const loginUserUseCase = loginUserUseCaseFactory({
  userRepository: prismaUserRepositoryFactory(prisma),
  sessionRepository: prismaSessionRepositoryFactory(prisma)
})

export const loginUserController = loginUserControllerFactory({
  sessionService,
  loginUserUseCase,
  loginUserValidator: loginUserSchema
})

export const loginUserPage = loginUserPageFactory()
