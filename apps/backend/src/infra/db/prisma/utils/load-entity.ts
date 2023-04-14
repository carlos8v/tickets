import type {
  User as PrismaUser,
  Session as PrismaSession,
  Ticket as PrismaTicket,
} from '@prisma/client'

import type { UserModel } from '@domain/user'
import { makeUser } from '@domain/user'

import type { SessionModel } from '@domain/session'
import { makeSession } from '@domain/session'

import type { TicketModel, TicketStatus } from '@domain/ticket'
import { makeTicket } from '@domain/ticket'

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

export const loadTicketEntity = (
  ticket: Pick<PrismaTicket, 'id' | 'subject' | 'status' | 'createdAt' |'updatedAt'>,
  reporter: PrismaUser,
  isReporterAdmin: boolean = false,
  responsable?: PrismaUser
): TicketModel =>
  makeTicket({
    id: ticket.id,
    subject: ticket.subject,
    status: ticket.status as TicketStatus,
    reportedBy: loadUserEntity(reporter, isReporterAdmin),
    responsable: responsable ? loadUserEntity(responsable, true) : undefined,
    createdAt: new Date(ticket.createdAt),
    updatedAt: ticket.updatedAt ? new Date(ticket.updatedAt) : undefined,
  })
