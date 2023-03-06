import { renderTemplate } from '@infra/http/helpers/http-helper'

type ChatPageFactory = Controller<void>

export const chatPageFactory: ChatPageFactory = () => {
  return ({ params }) => {
    return renderTemplate({
      view: 'chat',
      data: {
        id: params.id,
        finished: false
      },
    })
  }
}
