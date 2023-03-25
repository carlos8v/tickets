import type { SessionService } from '../interfaces/session-service'

export const sessionService: SessionService = {
  formatSessionOptions: (session) => {
    let maxAge = 0

    if (session) {
      const startDate = new Date(session.createdAt).getTime()
      const finalDate = new Date(session.expiresAt).getTime()
      maxAge = finalDate - startDate
    }

    return {
      path: '/',
      httpOnly: true,
      maxAge
    }
  }
}
