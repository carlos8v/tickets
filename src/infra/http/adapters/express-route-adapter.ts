import type { Request, Response } from 'express'
type ControllerFunction = ReturnType<Controller<any>>

export const expressRouteAdapter = (controller: ControllerFunction) => {
  return async (req: Request, res: Response) => {
    try {
      // TODO - parse express request to controller
      const response = await controller({
        body: req.body,
        headers: req.headers,
        params: req.params,
        query: req.query,
        cookies: new Map()
      })

      if (response.error) {
        return res.status(response.statusCode).json({
          status: response.statusCode,
          error: response.data?.name,
          message: response.data?.message || 'Unexpected Error',
        })
      }

      // TODO - handle cookies
      // if (response.cookies?.size !== 0) {
      // }

      return res
        .status(response.statusCode)
        .render(response.view, response?.data || {})

    } catch (error: Error | any) {
      console.error(error)
      return res.status(500).json({
        status: 500,
        error: error?.message || 'Internal server error',
      })
    }
  }
}
