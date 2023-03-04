import type { Either } from '@domain/utils/either'
import { left, right } from '@domain/utils/either'

import type { SessionModel } from '@domain/session'
import { makeSession } from '@domain/session'

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

    const oneHourInMilliseconds = 1000 * 60 * 60
    const sessionRemaingTimeInMilliseconds =
      new Date(session.expiresAt).getTime() - new Date().getTime()

    if (sessionRemaingTimeInMilliseconds <= oneHourInMilliseconds) {
      const newSession = makeSession({ userId: session.userId })
      await sessionRepository.save(newSession)
      return right(newSession)
    }

    return right(session)
  }
}
