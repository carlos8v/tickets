import type { SessionModel } from '@domain/session'

export interface SessionRepository {
  save(userData: SessionModel): Promise<void>
  findBySessionId(email: string): Promise<SessionModel | null>
}
