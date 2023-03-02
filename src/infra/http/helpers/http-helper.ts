export type HttpHelper = {
  view: string
  statusCode: number
  data?: Record<string | number, any> | null
  cookies?: Map<string, string>
  error?: boolean
}

type RouteOpts = Pick<HttpHelper, 'data' | 'cookies'>
const defaultRouteOpts = { data: null, cookies: new Map() }

export const ok = (
  view = 'index',
  opts: RouteOpts = defaultRouteOpts
): HttpHelper => ({
  view,
  data: opts?.data || null,
  cookies: opts.cookies,
  statusCode: 200,
})

export const created = (
  view = 'index',
  opts: RouteOpts = defaultRouteOpts
): HttpHelper => ({
  view,
  data: opts?.data || null,
  cookies: opts?.cookies || new Map(),
  statusCode: 201,
})

export const badRequest = (
  view = 'index',
  opts: RouteOpts = defaultRouteOpts
): HttpHelper => ({
  view,
  data: opts?.data || null,
  cookies: opts?.cookies || new Map(),
  error: true,
  statusCode: 400,
})

export const unauthorized = (
  view = 'index',
  opts: RouteOpts = defaultRouteOpts
): HttpHelper => ({
  view,
  data: opts?.data || null,
  cookies: opts?.cookies || new Map(),
  error: true,
  statusCode: 401,
})

export const forbidden = (
  view = 'index',
  opts: RouteOpts = defaultRouteOpts
): HttpHelper => ({
  view,
  data: opts?.data || null,
  cookies: opts?.cookies || new Map(),
  error: true,
  statusCode: 403,
})

export const notFound = (
  view = 'index',
  opts: RouteOpts = defaultRouteOpts
): HttpHelper => ({
  view,
  data: opts?.data || null,
  cookies: opts?.cookies || new Map(),
  error: true,
  statusCode: 404,
})

export const unprocessableEntity = (
  view = 'index',
  opts: RouteOpts = defaultRouteOpts
): HttpHelper => ({
  view,
  data: opts?.data || null,
  cookies: opts?.cookies || new Map(),
  error: true,
  statusCode: 422,
})
