export type HttpHelper = {
  view: string
  data?: Record<string | number, any> | null
  cookies: Map<string, string>
}

type RouteOpts = Partial<Pick<HttpHelper, 'data' | 'cookies'>>

const defaultRouteOpts = {
  data: null,
  cookies: new Map()
}

export const renderTemplate = (
  view = 'index',
  opts: RouteOpts = defaultRouteOpts
): HttpHelper => ({
  view,
  data: opts?.data || null,
  cookies: opts?.cookies || new Map()
})
