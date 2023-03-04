import type { HttpHelper } from '@infra/http/helpers/http-helper'

type HttpRequest = {
  body: Record<string, any>
  query: Record<string, string | object>
  params: Record<string, string>
  headers: Map<string, string>
  cookies: Map<string, string | null>
}

declare global {
  type UseCase<Constructor, Req, Res> = (c: Constructor) => (r: Req) => Res
  type Controller<C> = (_: C) => (req: HttpRequest) => Promise<HttpHelper> | HttpHelper
}

export {}
