import { renderTemplate } from '@infra/http/helpers/http-helper'

type IndexPageFactory = Controller<void>

export const indexPageFactory: IndexPageFactory = () => () => {
  return renderTemplate({
    view: 'index',
    data: {
      tickets: [],
    },
  })
}
