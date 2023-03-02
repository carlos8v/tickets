import type { HttpHelper } from '@infra/http/helpers/http-helper'

type HttpRequest = {
  body: Record<string, any>
  query: Record<string, string | string[]>
  params: Record<string, string>
  headers: Record<string, string>
  cookies: Map<string, string>
}

declare global {
  type UseCase<Constructor, Req, Res> = (c: Constructor) => (r: Req) => Res
  type Controller<C> = (_: C) => (req: HttpRequest) => Promise<HttpHelper> | HttpHelper
}

export {}
