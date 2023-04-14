import type { SessionRepository } from '@application/interfaces/session-repository'

type LogoutUserUseCaseFactory = UseCase<
  { sessionRepository: SessionRepository },
  string,
  Promise<void>
>

export const logoutUserUseCaseFactory: LogoutUserUseCaseFactory = ({
  sessionRepository,
}) => {
  return async (sessionId) => {
    await sessionRepository.destroySession(sessionId)
  }
}
