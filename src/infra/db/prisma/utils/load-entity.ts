import type {
  User as PrismaUser,
  Admin as PrismaAdmin,
  Session as PrismaSession,
} from '@prisma/client'

import type { UserModel } from '@domain/user'
import { makeUser } from '@domain/user'

import type { AdminModel } from '@domain/admin'
import { makeAdmin } from '@domain/admin'

import type { SessionModel } from '@domain/session'
import { makeSession } from '@domain/session'

export const loadUserEntity = (user: PrismaUser): UserModel =>
  makeUser({
    id: user.id,
    email: user.email,
    name: user.name,
    password: user.password,
    createdAt: new Date(user.createdAt),
  })

export const loadAdminEntity = (admin: PrismaAdmin): AdminModel =>
  makeAdmin({
    id: admin.id,
    userId: admin.userId,
    createdAt: new Date(admin.createdAt),
  })

export const loadSessionEntity = (session: PrismaSession): SessionModel =>
  makeSession({
    id: session.id,
    userId: session.userId,
    createdAt: new Date(session.createdAt),
    expiresAt: new Date(session.expiresAt),
  })
