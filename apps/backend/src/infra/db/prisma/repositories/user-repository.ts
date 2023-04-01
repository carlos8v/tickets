import { randomUUID } from 'crypto'
import type { PrismaClient } from '@prisma/client'
import type { UserRepository } from '@application/interfaces/user-repository'

import { loadUserEntity } from '../utils/load-entity'

export const prismaUserRepositoryFactory: (
  prisma: PrismaClient
) => UserRepository = (prisma) => ({
  save: async (userData) => {
    await prisma.user.upsert({
      where: {
        id: userData.id,
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
        password: userData.password,
      },
    })

    if (!userData.admin) {
      await prisma.admin.deleteMany({ where: { userId: userData.id } })
      return
    }

    await prisma.admin.upsert({
      where: { userId: userData.id },
      create: {
        id: randomUUID(),
        userId: userData.id,
        createdAt: new Date(),
      },
      update: {},
    })
  },
  findByEmail: async (email) => {
    const user = await prisma.user.findFirst({
      where: { email },
    })

    if (!user?.id) return null

    return loadUserEntity(user)
  },
  findById: async (id) => {
    const user = await prisma.user.findFirst({
      where: { id },
    })

    if (!user?.id) return null

    return loadUserEntity(user)
  },
  setAdmin: async (userId) => {
    const user = await prisma.user.findFirst({
      where: { id: userId },
      include: {
        admin: true,
      },
    })

    if (!user) return
    if (user.admin?.id) return

    await prisma.admin.create({
      data: {
        id: randomUUID(),
        userId,
        createdAt: new Date(),
      },
    })
  },
})
