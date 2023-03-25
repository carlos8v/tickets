declare global {
  type UseCase<Constructor, Req, Res> = (c: Constructor) => (r: Req) => Res
}

export { AppRouter } from '@infra/http/routes'

export { AdminModel } from '@domain/admin'
export { UserModel } from '@domain/user'
export { SessionModel } from '@domain/session'
export { TicketModel } from '@domain/ticket'
