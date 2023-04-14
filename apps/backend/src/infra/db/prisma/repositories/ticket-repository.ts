import type { PrismaClient } from '@prisma/client'
import type { TicketRepository } from '@application/interfaces/ticket-repository'

import { loadTicketEntity } from '../utils/load-entity'

export const prismaSessionRepositoryFactory: (
  prisma: PrismaClient
) => TicketRepository = (prisma) => ({
  save: async (ticketData) => {
    await prisma.ticket.upsert({
      where: {
        id: ticketData.id,
      },
      create: {
        id: ticketData.id,
        subject: ticketData.subject,
        reportedBy: ticketData.reportedBy.id,
        responsableId: ticketData.responsable?.id,
        status: ticketData.status,
        createdAt: ticketData.createdAt,
        updatedAt: ticketData.updatedAt,
      },
      update: {
        subject: ticketData.subject,
        reportedBy: ticketData.reportedBy.id,
        responsableId: ticketData.responsable?.id,
        status: ticketData.status,
        updatedAt: ticketData.updatedAt,
      },
    })
  },
  findManyBy: async ({ name = '', status = 'ALL' }) => {
    const tickets = await prisma.ticket.findMany({
      where: {
        ...(status !== 'ALL' ? {
          status
        } : {}),
        ...(name !== '' ? {
          subject: {
            contains: name
          }
        } : {})
      },
      include: {
        reporter: {
          include: {
            admin: {
              include: {
                user: true
              }
            }
          }
        },
        responsable: {
          include: {
            user: true
          }
        }
      }
    })

    return tickets.map(({
      id,
      subject,
      status,
      reporter,
      responsable,
      createdAt,
      updatedAt
    }) => loadTicketEntity(
      {
        id,
        subject,
        status,
        createdAt,
        updatedAt
      },
      reporter,
      !!reporter.admin?.id,
      responsable?.user
    ))    
  },
})
