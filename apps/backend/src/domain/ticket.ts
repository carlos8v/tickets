import { randomUUID } from 'crypto'
import type { OptionalProps } from './utils/optional-props'

export type TicketStatus = 'OPENED' | 'ARCHIVED' | 'RESOLVED' | 'UNRESOLVED'

export type TicketModel = {
  id: string
  subject: string
  reportedBy: string
  responsableId?: string
  status: TicketStatus
  createdAt: Date | string
  updatedAt?: Date | string
}

type OptionalCreateProps = 'id' | 'status' | 'createdAt' | 'updatedAt'
export type CreateAdminProps = OptionalProps<TicketModel, OptionalCreateProps>

export const makeTicket = (ticketData: CreateAdminProps): TicketModel => ({
  id: ticketData?.id || randomUUID(),
  reportedBy: ticketData.reportedBy,
  status: ticketData?.status || 'OPENED',
  subject: ticketData.subject,
  responsableId: ticketData?.responsableId || undefined,
  createdAt: ticketData?.createdAt || new Date(),
  updatedAt: ticketData?.updatedAt || undefined,
})
