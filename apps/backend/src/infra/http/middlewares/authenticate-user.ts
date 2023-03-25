import { prisma } from '@infra/db/prisma/prisma-client'
import { prismaUserRepositoryFactory } from '@infra/db/prisma/repositories/user-repository'
import { prismaSessionRepositoryFactory } from '@infra/db/prisma/repositories/session-repository'

import { sessionService } from '@infra/http/services/session-service'

import { authenticateUserUseCaseFactory } from '@application/use-cases/authenticate-user/authenticate-user'

import { middleware, Unauthorized } from '../adapters/trpc'

import { infraErrors, kInvalidAuthRequest } from '../errors'

const authenticateUseUseCase = authenticateUserUseCaseFactory({
  userRepository: prismaUserRepositoryFactory(prisma),
  sessionRepository: prismaSessionRepositoryFactory(prisma),
})

export const authenticateUser = middleware(async ({ ctx, next }) => {
  const sessionId = ctx.req.cookies['session_id']
  if (!sessionId || typeof sessionId !== 'string') {
    throw Unauthorized(infraErrors[kInvalidAuthRequest])
  }

  const payload = await authenticateUseUseCase(sessionId)
  if (payload.isLeft()) {
    ctx.res.clearCookie('session_id', sessionService.formatSessionOptions())
    throw Unauthorized(infraErrors[kInvalidAuthRequest])
  }

  if (sessionId !== payload.value.session.id) {
    ctx.res.cookie(
      'session_id',
      payload.value.session.id,
      sessionService.formatSessionOptions(payload.value.session)
    )
  }

  return next({ ctx })
})
