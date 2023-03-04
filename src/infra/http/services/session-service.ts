import type { SessionService } from '../interfaces/session-service'

import { parseCookie } from '../helpers/http-helper'

export const sessionService: SessionService = {
  formatSession: (session) => {
    const startDate = new Date(session.createdAt).getTime()
    const finalDate = new Date(session.expiresAt).getTime()
    const maxAge = finalDate - startDate

    return parseCookie(session.id, maxAge)
  }
}
