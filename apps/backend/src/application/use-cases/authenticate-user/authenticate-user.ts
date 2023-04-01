import type { Either } from '@domain/utils/either'
import { left, right } from '@domain/utils/either'

import type { SessionModel } from '@domain/session'
import { makeSession } from '@domain/session'

import type { SessionRepository } from '@application/interfaces/session-repository'
import type { UserRepository } from '@application/interfaces/user-repository'

import { kNotAuthorizedUser, kInvalidUser } from '@application/errors'

type AuthenticateUseUseCaseFactory = UseCase<
  {
    sessionRepository: SessionRepository
    userRepository: UserRepository
  },
  string,
  Promise<
    Either<
      typeof kNotAuthorizedUser | typeof kInvalidUser,
      SessionModel
    >
  >
>

export const authenticateUserUseCaseFactory: AuthenticateUseUseCaseFactory = ({
  sessionRepository,
}) => {
  return async (sessionId) => {
    const session = await sessionRepository.findBySessionId(sessionId)
    if (!session?.id) return left(kNotAuthorizedUser)
    if (!session.user?.id) return left(kInvalidUser)

    const { password, ...safeUser } = session.user

    const oneHourInMilliseconds = 1000 * 60 * 60
    const sessionRemaingTimeInMilliseconds =
      new Date(session.expiresAt).getTime() - new Date().getTime()

    if (sessionRemaingTimeInMilliseconds <= oneHourInMilliseconds) {
      const newSession = makeSession({ user: session.user })
      await sessionRepository.save(newSession)
      return right({ ...newSession, user: safeUser })
    }

    return right({ ...session, user: safeUser })
  }
}
