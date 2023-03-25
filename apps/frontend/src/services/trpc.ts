import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '../../../backend/src/infra/http/routes'

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({ url: `http://localhost:${import.meta.env.VITE_PORT}/api/trpc` })
  ]
})