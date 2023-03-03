import { renderTemplate } from '@infra/http/helpers/http-helper'

type LoginUserPageFactory = Controller<void>

export const loginUserPageFactory: LoginUserPageFactory = () => () => {
  return renderTemplate({
    view: 'login',
    data: {
      error: null,
      email: null,
    },
  })
}
