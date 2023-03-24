import { send } from '@infra/http/helpers/http-helper'

type IndexPageFactory = Controller<void>

export const indexPageFactory: IndexPageFactory = () => () => {
  return send({ html: true })
}
