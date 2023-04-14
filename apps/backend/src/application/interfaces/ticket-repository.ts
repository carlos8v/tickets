import type { TicketModel, TicketStatus } from '@domain/ticket'

export interface TicketRepository {
  save(userData: TicketModel): Promise<void>
  findManyBy(
    opts: Partial<{ name: string; status: TicketStatus | 'ALL' }>
  ): Promise<TicketModel[]>
}
