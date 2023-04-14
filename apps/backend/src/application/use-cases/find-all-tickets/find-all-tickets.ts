import type { TicketModel, TicketStatus } from '@domain/ticket'

import { TicketRepository } from '@application/interfaces/ticket-repository'

type FindAllTicketsUseCaseFactory = UseCase<
  { ticketRepository: TicketRepository },
  {
    name?: string,
    status: TicketStatus | 'ALL'
  },
  Promise<TicketModel[]>
>

export const findAllTicketsUseCaseFactory: FindAllTicketsUseCaseFactory = ({
  ticketRepository
}) => {
  return async ({
    name = '',
    status = 'ALL'
  }) => {
    const tickets = await ticketRepository.findManyBy({
      name,
      status
    })

    return tickets
  }
}
