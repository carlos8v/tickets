import { renderTemplate } from '@infra/http/helpers/http-helper'

type RegisterUserPageFactory = Controller<void>

export const registerUserPageFactory: RegisterUserPageFactory = () => () => {
  return renderTemplate({
    view: 'register',
    data: {
      error: null,
      name: null,
      email: null,
      password: null,
    },
  })
}
