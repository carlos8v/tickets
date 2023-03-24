export type HttpHelper = {
  html: boolean;
  data?: Record<string | number, any> | null
  cookies: Map<string, string | null>
}

type RouteProps = Partial<HttpHelper>

const defaultRouteProps: RouteProps = {
  html: false,
  cookies: new Map(),
}

export const send = (
  opts: RouteProps = defaultRouteProps
): HttpHelper => ({
  html: opts?.html || false,
  data: opts?.data,
  cookies: opts?.cookies || new Map(),
})

export const nextMiddleware = (
  opts: RouteProps = defaultRouteProps
): HttpHelper => ({
  html: opts?.html || false,
  data: opts?.data,
  cookies: opts?.cookies || new Map(),
})

export const parseCookie = (value: string, maxAge: number) => `${value};${maxAge}`
