import type { PrismaClient } from '@prisma/client'
import type { SessionRepository } from '@application/interfaces/session-repository'

import { loadSessionEntity } from '../utils/load-entity'

export const prismaSessionRepositoryFactory: (
  prisma: PrismaClient
) => SessionRepository = (prisma) => ({
  save: async (sessionData) => {
    await prisma.session.upsert({
      where: {
        id: sessionData.id,
      },
      create: {
        id: sessionData.id,
        userId: sessionData.user.id,
        createdAt: sessionData.createdAt,
        expiresAt: sessionData.expiresAt,
      },
      update: { expiresAt: sessionData.expiresAt },
    })
  },
  findBySessionId: async (sessionId) => {
    const session = await prisma.session.findFirst({
      where: { id: sessionId },
      include: {
        user: {
          include: {
            admin: true
          }
        }
      }
    })

    if (!session?.id) return null

    return loadSessionEntity(session, session.user, !!session.user.admin?.id)
  },
})
