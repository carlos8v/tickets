import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '@infra/http/routes'

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({ url: '/api/trpc' })
  ]
})
