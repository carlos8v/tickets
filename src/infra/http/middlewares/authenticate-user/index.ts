import { prisma } from '@infra/db/prisma/prisma-client'
import { prismaSessionRepositoryFactory } from '@infra/db/prisma/repositories/session-repository'

import { authenticateUserUseCaseFactory } from '@application/use-cases/authenticate-user/authenticate-user'

import { authenticateUserMiddlewareFactory } from './authenticate-user'

const authenticateUseUseCase = authenticateUserUseCaseFactory({
  sessionRepository: prismaSessionRepositoryFactory(prisma),
})

export const authenticateUserMiddleware = authenticateUserMiddlewareFactory({
  authenticateUseUseCase,
})
