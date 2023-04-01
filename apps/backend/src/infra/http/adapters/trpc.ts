import type { CreateExpressContextOptions } from '@trpc/server/adapters/express'

import type { inferAsyncReturnType } from '@trpc/server'
import type { TRPC_ERROR_CODE_KEY } from '@trpc/server/rpc'
import { initTRPC, TRPCError } from '@trpc/server'

export const createContext = ({ req, res }: CreateExpressContextOptions) => ({
  userId: null as string | null,
  req,
  res,
})

type Context = inferAsyncReturnType<typeof createContext>

export const t = initTRPC.context<Context>().create()

export const router = t.router
export const middleware = t.middleware
export const publicProcedure = t.procedure

const throwTrpcError = ({
  message = 'Erro inesperado ocorreu',
  code,
}: {
  message?: string
  code: TRPC_ERROR_CODE_KEY
}) => new TRPCError({ code, message })

export const NotFound = (message: string) =>
  throwTrpcError({ message, code: 'NOT_FOUND' })
export const Unauthorized = (message: string) =>
  throwTrpcError({ message, code: 'UNAUTHORIZED' })
export const BadRequest = (message: string) =>
  throwTrpcError({ message, code: 'BAD_REQUEST' })
