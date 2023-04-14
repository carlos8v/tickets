import z from 'zod'
import { prisma } from '@infra/db/prisma/prisma-client'
import { prismaUserRepositoryFactory } from '@infra/db/prisma/repositories/user-repository'

import { findAllUsersUseCaseFactory } from '@application/use-cases/find-all-users/find-all-users'

import { publicProcedure } from '../adapters/trpc'

import { authenticateUser } from '../middlewares/authenticate-user'

const findAllUsersUseCase = findAllUsersUseCaseFactory({
  userRepository: prismaUserRepositoryFactory(prisma),
})

export const findAllUsers = publicProcedure
  .use(authenticateUser)
  .input(
    z.object({
      name: z.string().default(''),
      email: z.string().default(''),
    })
  )
  .query(async ({ input }) => {
    const tickets = await findAllUsersUseCase(input)
    return tickets
  })
