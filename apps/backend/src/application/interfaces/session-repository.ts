import type { SessionModel } from '@domain/session'

export interface SessionRepository {
  save(userData: SessionModel): Promise<void>
  destroySession(sessionId: string): Promise<void>
  findBySessionId(email: string): Promise<SessionModel | null>
}
