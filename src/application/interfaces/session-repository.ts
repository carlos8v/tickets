import type { SessionModel } from '@domain/session'

export interface SessionRepository {
  save(userData: SessionModel): Promise<void>
  findByUserId(email: string): Promise<SessionModel | null>
}
