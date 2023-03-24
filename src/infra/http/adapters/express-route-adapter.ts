import type { IncomingHttpHeaders } from 'http'
import type { NextFunction, Request, Response } from 'express'

import path from 'path'

type ControllerFunction = ReturnType<Controller<any>>

import { kUnexpectedError } from '../errors'

const indexPage = path.resolve(__dirname, '../../../../', 'public/index.html')

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

export const expressMiddlewareAdapter = (controller: ControllerFunction) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await controller({
        body: req.body,
        headers: parseHeaders(req.headers),
        params: req.params,
        query: parseQuery(req.query),
        cookies: new Map(Object.entries(req.cookies)),
      })

      if (response.cookies.size) {
        for (const [name, value] of [...response.cookies.entries()]) {
          if (value === null) {
            res.clearCookie(name, {
              path: '/',
              httpOnly: true
            })
            continue
          }

          const [stripedValue, maxAge] = value.split(';')
          if (!maxAge) continue

          res.cookie(name, stripedValue, {
            path: '/',
            httpOnly: true,
            maxAge: Number(maxAge),
          })
        }
      }

      return next()
    } catch (error: Error | any) {
      console.error(error)
      return res.status(500).json({
        error: error?.message || kUnexpectedError,
      })
    }
  }
}

export const expressRouteAdapter = (controller: ControllerFunction) => {
  return async (req: Request, res: Response) => {
    try {
      const response = await controller({
        body: req.body,
        headers: parseHeaders(req.headers),
        params: req.params,
        query: parseQuery(req.query),
        cookies: new Map(Object.entries(req.cookies)),
      })

      if (response.cookies.size) {
        for (const [name, value] of [...response.cookies.entries()]) {
          if (value === null) {
            res.clearCookie(name, {
              path: '/',
              httpOnly: true
            })
            continue
          }

          const [stripedValue, maxAge] = value.split(';')
          if (!maxAge) continue

          res.cookie(name, stripedValue, {
            path: '/',
            httpOnly: true,
            maxAge: Number(maxAge),
          })
        }
      }

      if (response.html) {
        return res.sendFile(indexPage)
      }

      return res.json(response?.data)
    } catch (error: Error | any) {
      console.error(error)
      return res.status(500).json({
        error: error?.message || kUnexpectedError,
      })
    }
  }
}
