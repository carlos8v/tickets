import type { SessionModel } from '@domain/session'

export interface SessionService {
  formatSession: (payload: SessionModel) => string
}
