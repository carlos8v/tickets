import z from 'zod'

import { prisma } from '@infra/db/prisma/prisma-client'
import { prismaUserRepositoryFactory } from '@infra/db/prisma/repositories/user-repository'

import { assignAdminUseCaseFactory } from '@application/use-cases/assign-admin/assign-admin'

import { BadRequest, publicProcedure } from '../adapters/trpc'
import { authenticateUser } from '../middlewares/authenticate-user'
import { applicationErrors } from '@application/errors'

const assignAdminUseCase = assignAdminUseCaseFactory({
  userRepository: prismaUserRepositoryFactory(prisma),
})

export const assingAdmin = publicProcedure
  .input(z.string())
  .use(authenticateUser)
  .mutation(async ({ input }) => {
    const payload = await assignAdminUseCase(input)
    if (payload.isLeft()) throw BadRequest(applicationErrors[payload.value])

    return payload.value
  })
