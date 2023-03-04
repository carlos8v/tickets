type SocketRequest = {
  id: number
  jsonrpc: string
  method: string
  params: any
}

type SocketResponse = {
  type: 'request' | 'notification'
  result?: any
  error?: any
}

let socket

async function setupWebSocketConnection(endpoint: string) {
  const socketFactory = (ws: WebSocket) => ({
    _ws: ws,
    version: '2.0',
    call_id: 0,
    connected: false,
    namespaces: new Map<string, (res: SocketResponse) => void>(),
    emitter: new EventTarget(),
    queue: new Map<number, SocketResponse>(),
    listen: async function () {
      await new Promise((resolve) => this._ws.addEventListener('open', resolve))
      this.connected = true

      this._ws.addEventListener('message', (e) => {
        try {
          const payload = JSON.parse(e.data)

          if (
            payload.notification &&
            this.namespaces.has(payload.notification)
          ) {
            const cb = this.namespaces.get(payload.notification)!
            cb({ type: 'notification', result: payload.params })
            return
          }

          const event = this.queue.get(payload.id)
          if (!event) return

          if (payload.error) {
            this.queue.set(payload.id, {
              ...event,
              error: payload.error.message,
            })
          } else {
            this.queue.set(payload.id, { ...event, result: payload.result })
          }

          this.emitter.dispatchEvent(new Event(String(payload.id)))
        } catch (error) {
          console.error(error)
        }
      })
    },
    _send: function (request: SocketRequest) {
      let responseData: SocketResponse = {
        type: 'request',
      }

      if (request.method === 'subscribe') {
        request.method = 'rpc.on'
        responseData.type = 'notification'
      }

      this.queue.set(request.id, responseData)
      this._ws.send(JSON.stringify(request))
    },
    subscribe: function (
      namespace: string,
      cb: (res: SocketResponse) => void
    ): Promise<SocketResponse> {
      const request = {
        jsonrpc: this.version,
        method: 'subscribe',
        params: [namespace],
        id: ++this.call_id,
      }

      this.namespaces.set(namespace, cb)

      return new Promise((resolve, reject) => {
        this._send(request)
        this.emitter.addEventListener(String(request.id), () => {
          const response = this.queue.get(request.id)!
          this.queue.delete(request.id)
          resolve(response)
        })
      })
    },
    send: function (method: string, ...params: any): Promise<SocketResponse> {
      if (!this.connected)
        throw new Error('WebSocket connection not estabilished')

      const request = {
        jsonrpc: this.version,
        method,
        params,
        id: ++this.call_id,
      }

      return new Promise((resolve, reject) => {
        this._send(request)
        this.emitter.addEventListener(String(request.id), () => {
          const response = this.queue.get(request.id)!
          this.queue.delete(request.id)

          resolve(response)
        })
      })
    },
  })

  const wsClient = new WebSocket(endpoint)
  socket = socketFactory(wsClient)
  await socket.listen()

  console.log(await socket.send('sum', 1, 2))
}

setupWebSocketConnection('ws://localhost:3333')
