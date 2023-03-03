import type { PrismaClient } from '@prisma/client'
import type { UserRepository } from '@application/interfaces/user-repository'

import { loadUserEntity } from '../utils/load-entity'

export const prismaUserRepositoryFactory: (prisma: PrismaClient) => UserRepository = (prisma) => ({
  save: async (userData) => {
    await prisma.user.upsert({
      where: {
        id: userData.id
      },
      create: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        password: userData.password,
        createdAt: userData.createdAt,
      },
      update: {
        name: userData.name,
        email: userData.email,
        password: userData.password
      }
    })
  },
  findByEmail: async (email) => {
    const user = await prisma.user.findFirst({
      where: { email }
    })

    if (!user?.id) return null

    return loadUserEntity(user)
  }
})
