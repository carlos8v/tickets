import { prisma } from '@infra/db/prisma/prisma-client'
import { prismaUserRepositoryFactory } from '@infra/db/prisma/repositories/user-repository'
import { prismaSessionRepositoryFactory } from '@infra/db/prisma/repositories/session-repository'

import { sessionService } from '@infra/http/services/session-service'

import { registerUserUseCaseFactory } from '@application/use-cases/register-user/register-user'
import { registerUserSchema } from '@application/use-cases/register-user/register-user-validator'

import { BadRequest, publicProcedure } from '../adapters/trpc'
import { applicationErrors } from '@application/errors'

const registerUserUseCase = registerUserUseCaseFactory({
  userRepository: prismaUserRepositoryFactory(prisma),
  sessionRepository: prismaSessionRepositoryFactory(prisma),
})

export const registerUser = publicProcedure
  .input(registerUserSchema)
  .mutation(async ({ input, ctx }) => {
    const session = await registerUserUseCase(input)
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
