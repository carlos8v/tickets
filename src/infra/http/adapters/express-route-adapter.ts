import type { IncomingHttpHeaders } from 'http'
import type { Request, Response } from 'express'

type ControllerFunction = ReturnType<Controller<any>>

function parseHeaders(headers: IncomingHttpHeaders) {
  return Object.entries(headers).reduce((headersMap, [name, value]) => {
    if (Array.isArray(value)) headersMap.set(name, value[0])
    else if (value !== undefined) headersMap.set(name, value)

    return headersMap
  }, new Map<string, string>())
}

function parseQuery(query: Request['query']) {
  const queryMap = Object.entries(query).reduce((queryMap, [name, value]) => {
    if (Array.isArray(value)) queryMap.set(name, value[0].toString())
    else if (value !== undefined) queryMap.set(name, value)

    return queryMap
  }, new Map<string, string | object>())

  return Object.fromEntries(queryMap.entries())
}

export const expressRouteAdapter = (controller: ControllerFunction) => {
  return async (req: Request, res: Response) => {
    try {
      const response = await controller({
        body: req.body,
        headers: parseHeaders(req.headers),
        params: req.params,
        query: parseQuery(req.query),
        cookies: new Map(),
      })

      if (response.cookies.size) {
        [...response.cookies.entries()].forEach(([name, value]) => {
          res.cookie(name, value, {
            path: '/',
            httpOnly: true,
            maxAge: 1000 * 60
          })
        })
      }

      return res.render(response.view, response?.data || {})
    } catch (error: Error | any) {
      console.error(error)
      return res.render('error', {
        error: error?.message || 'Um erro inesperado ocorreu',
      })
    }
  }
}
