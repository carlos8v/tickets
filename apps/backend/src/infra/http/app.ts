import express from 'express'
import cookieParser from 'cookie-parser'

import * as trpcExpress from '@trpc/server/adapters/express'
import { createContext } from './adapters/trpc'
import { appRouter } from './routes'

export const app = express()

app.use(cookieParser(process.env.SESSION_SECRET!))

app.use(express.json())

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    createContext,
    router: appRouter,
  }),
)
