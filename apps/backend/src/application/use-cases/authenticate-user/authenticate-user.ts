import type { Either } from '@domain/utils/either'
import { left, right } from '@domain/utils/either'

import type { SessionModel } from '@domain/session'
import { makeSession } from '@domain/session'

import type { SessionRepository } from '@application/interfaces/session-repository'
import type { UserRepository } from '@application/interfaces/user-repository'

import { kNotAuthorizedUser, kInvalidUser } from '@application/errors'
import { UserModel } from '@domain/user'

type AuthenticateUseUseCaseFactory = UseCase<
  {
    sessionRepository: SessionRepository
    userRepository: UserRepository
  },
  string,
  Promise<
    Either<
      typeof kNotAuthorizedUser | typeof kInvalidUser,
      { session: SessionModel, user: Omit<UserModel, 'password'> }
    >
  >
>
export type AuthenticateUseUseCase = ReturnType<AuthenticateUseUseCaseFactory>

export const authenticateUserUseCaseFactory: AuthenticateUseUseCaseFactory = ({
  sessionRepository,
  userRepository,
}) => {
  return async (sessionId) => {
    const session = await sessionRepository.findBySessionId(sessionId)
    if (!session?.id) return left(kNotAuthorizedUser)

    const user = await userRepository.findById(session.userId)
    if (!user?.id) return left(kInvalidUser)

    const { password, ...safeUser } = user

    const oneHourInMilliseconds = 1000 * 60 * 60
    const sessionRemaingTimeInMilliseconds =
      new Date(session.expiresAt).getTime() - new Date().getTime()

    if (sessionRemaingTimeInMilliseconds <= oneHourInMilliseconds) {
      const newSession = makeSession({ userId: session.userId })
      await sessionRepository.save(newSession)
      return right({ session: newSession, user: safeUser })
    }

    return right({ session, user: safeUser })
  }
}
