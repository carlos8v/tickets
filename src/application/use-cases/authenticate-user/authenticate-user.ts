import type { Either } from '@domain/utils/either'
import { left, right } from '@domain/utils/either'

import type { SessionModel } from '@domain/session'

import type { SessionRepository } from '@application/interfaces/session-repository'

import { kNotAuthorizedUser } from '@application/errors'

type AuthenticateUseUseCaseFactory = UseCase<
  { sessionRepository: SessionRepository },
  string,
  Promise<Either<typeof kNotAuthorizedUser, SessionModel>>
>
export type AuthenticateUseUseCase = ReturnType<AuthenticateUseUseCaseFactory>

export const authenticateUserUseCaseFactory: AuthenticateUseUseCaseFactory = ({
  sessionRepository,
}) => {
  return async (sessionId) => {
    const session = await sessionRepository.findBySessionId(sessionId)
    if (!session?.id) return left(kNotAuthorizedUser)

    return right(session)
  }
}
