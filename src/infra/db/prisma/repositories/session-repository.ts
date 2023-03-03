import type { PrismaClient } from '@prisma/client'
import type { SessionRepository } from '@application/interfaces/session-repository'

import { loadSessionEntity } from '../utils/load-entity'

export const prismaSessionRepositoryFactory: (prisma: PrismaClient) => SessionRepository = (prisma) => ({
  save: async (sessionData) => {
    await prisma.session.upsert({
      where: {
        id: sessionData.id
      },
      create: {
        id: sessionData.id,
        userId: sessionData.userId,
        createdAt: sessionData.createdAt,
        expiresAt: sessionData.expiresAt
      },
      update: {
        userId: sessionData.userId,
        createdAt: sessionData.createdAt,
        expiresAt: sessionData.expiresAt
      }
    })
  },
  findByUserId: async (userId) => {
    const session = await prisma.session.findFirst({
      where: { userId }
    })

    if (!session?.id) return null

    return loadSessionEntity(session)
  }
})
