import z from 'zod'
import { prisma } from '@infra/db/prisma/prisma-client'
import { prismaSessionRepositoryFactory } from '@infra/db/prisma/repositories/ticket-repository'

import { findAllTicketsUseCaseFactory } from '@application/use-cases/find-all-tickets/find-all-tickets'

import { publicProcedure } from '../adapters/trpc'

import { authenticateUser } from '../middlewares/authenticate-user'

const findAllTicketsUseCase = findAllTicketsUseCaseFactory({
  ticketRepository: prismaSessionRepositoryFactory(prisma),
})

export const findAllTickets = publicProcedure
  .use(authenticateUser)
  .input(
    z.object({
      status: z
        .enum(['ALL', 'OPENED', 'ARCHIVED', 'RESOLVED', 'UNRESOLVED'])
        .default('ALL'),
      name: z.string().default(''),
    })
  )
  .query(async ({ input }) => {
    const tickets = await findAllTicketsUseCase(input)
    return tickets
  })
