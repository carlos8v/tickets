import { prisma } from '@infra/db/prisma/prisma-client'
import { prismaUserRepositoryFactory } from '@infra/db/prisma/repositories/user-repository'

import { findUserByIdUseCaseFactory } from '@application/use-cases/find-user-by-id/find-user-by-id'

import { BadRequest, publicProcedure } from '../adapters/trpc'

import { authenticateUser } from '../middlewares/authenticate-user'
import { applicationErrors } from '@application/errors'

const findUserByIdUseCase = findUserByIdUseCaseFactory({
  userRepository: prismaUserRepositoryFactory(prisma),
})

export const me = publicProcedure
  .use(authenticateUser)
  .query(async ({ ctx }) => {
    const payload = await findUserByIdUseCase(ctx.userId)

    if (payload.isLeft()) {
      throw BadRequest(applicationErrors[payload.value])
    }

    return payload.value
  })
