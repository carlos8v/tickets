import { randomUUID } from 'crypto'
import type { OptionalProps } from './utils/optional-props'

export type SessionModel = {
  id: string
  userId: string
  createdAt: Date | string
  expiresAt: Date | string
}

type OptionalCreateProps = 'id' | 'createdAt' | 'expiresAt'
export type CreateSessionProps = OptionalProps<SessionModel, OptionalCreateProps>

export const makeSession = (sessionData: CreateSessionProps): SessionModel => {
  const createdAt = sessionData?.createdAt || new Date()
  let expiresAt = sessionData?.expiresAt || new Date()

  if (!sessionData?.expiresAt) {
    expiresAt = new Date(expiresAt)
    expiresAt.setHours(expiresAt.getHours() + 24)
  }

  return {
    id: sessionData?.id || randomUUID(),
    userId: sessionData.userId,
    createdAt,
    expiresAt
  }
}
