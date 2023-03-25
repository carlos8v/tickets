import type { SessionModel } from '@domain/session'

export interface SessionService {
  formatSessionOptions: (session?: SessionModel) => {
    path: string
    httpOnly: boolean
    maxAge: number
  }
}
