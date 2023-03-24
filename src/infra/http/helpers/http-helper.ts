export type HttpHelper = {
  redirect?: string
  data?: Record<string | number, any> | null
  cookies: Map<string, string | null>
}

type RouteProps = Partial<HttpHelper>

const defaultRouteProps: RouteProps = {
  redirect: undefined,
  data: null,
  cookies: new Map(),
}

export const send = (
  opts: RouteProps = defaultRouteProps
): HttpHelper => ({
  redirect: opts.redirect,
  data: opts?.data || null,
  cookies: opts?.cookies || new Map(),
})

export const nextMiddleware = (
  opts: RouteProps = defaultRouteProps
): HttpHelper => ({
  redirect: opts.redirect,
  data: opts?.data || null,
  cookies: opts?.cookies || new Map(),
})

export const parseCookie = (value: string, maxAge: number) => `${value};${maxAge}`
