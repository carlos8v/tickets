export type HttpHelper = {
  view: string
  redirect?: string
  data?: Record<string | number, any> | null
  cookies: Map<string, string>
}

type RouteProps = Partial<HttpHelper>

const defaultRouteProps: RouteProps = {
  view: '',
  redirect: undefined,
  data: null,
  cookies: new Map(),
}

export const renderTemplate = (
  opts: RouteProps = defaultRouteProps
): HttpHelper => ({
  view: opts?.view || '',
  redirect: opts.redirect,
  data: opts?.data || null,
  cookies: opts?.cookies || new Map(),
})

export const nextMiddleware = (
  opts: RouteProps = defaultRouteProps
): HttpHelper => ({
  view: opts?.view || '',
  redirect: opts.redirect,
  data: opts?.data || null,
  cookies: opts?.cookies || new Map(),
})
