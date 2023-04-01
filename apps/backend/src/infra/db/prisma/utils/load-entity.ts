import type {
  User as PrismaUser,
  Session as PrismaSession,
} from '@prisma/client'

import type { UserModel } from '@domain/user'
import { makeUser } from '@domain/user'

import type { SessionModel } from '@domain/session'
import { makeSession } from '@domain/session'

export const loadUserEntity = (
  user: PrismaUser,
  admin: boolean = false
): UserModel =>
  makeUser({
    id: user.id,
    email: user.email,
    admin,
    name: user.name,
    password: user.password,
    createdAt: new Date(user.createdAt),
  })

export const loadSessionEntity = (
  session: PrismaSession,
  user: PrismaUser,
  admin: boolean = false
): SessionModel =>
  makeSession({
    id: session.id,
    user: loadUserEntity(user, admin),
    createdAt: new Date(session.createdAt),
    expiresAt: new Date(session.expiresAt),
  })
