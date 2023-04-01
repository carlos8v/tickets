import { prisma } from '@infra/db/prisma/prisma-client'
import { prismaUserRepositoryFactory } from '@infra/db/prisma/repositories/user-repository'
import { prismaSessionRepositoryFactory } from '@infra/db/prisma/repositories/session-repository'

import { sessionService } from '@infra/http/services/session-service'

import { loginUserUseCaseFactory } from '@application/use-cases/login-user/login-user'
import { loginUserSchema } from '@application/use-cases/login-user/login-user-validator'

import { publicProcedure, BadRequest } from '../adapters/trpc'

import { applicationErrors } from '@application/errors'

const loginUserUseCase = loginUserUseCaseFactory({
  userRepository: prismaUserRepositoryFactory(prisma),
  sessionRepository: prismaSessionRepositoryFactory(prisma),
})

export const loginUser = publicProcedure
  .input(loginUserSchema)
  .mutation(async ({ input, ctx }) => {
    const { email, password } = input
    const session = await loginUserUseCase({ email, password })
    if (session.isLeft()) {
      throw BadRequest(applicationErrors[session.value])
    }

    ctx.res.cookie(
      'session_id',
      session.value.id,
      sessionService.formatSessionOptions(session.value)
    )

    return session.value.user
  })
