import { prisma } from '@infra/db/prisma/prisma-client'
import { prismaSessionRepositoryFactory } from '@infra/db/prisma/repositories/session-repository'

import { logoutUserUseCaseFactory } from '@application/use-cases/logout-user/logout-user'

import { publicProcedure } from '../adapters/trpc'

import { authenticateUser } from '../middlewares/authenticate-user'

const logoutUserUseCase = logoutUserUseCaseFactory({
  sessionRepository: prismaSessionRepositoryFactory(prisma),
})

export const logoutUser = publicProcedure
  .use(authenticateUser)
  .mutation(async ({ ctx }) => {
    await logoutUserUseCase(ctx.sessionId)
    ctx.res.clearCookie('session_id')
  })
