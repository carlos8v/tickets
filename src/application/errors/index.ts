export const kInvalidUser = Symbol('kInvalidUser')
export const kInvalidUserCredentials = Symbol('kInvalidUserCredentials')
export const kUserAlreadyExists = Symbol('kUserAlreadyExists')
export const kMismatchingUserPass = Symbol('kMismatchingUserPass')
export const kNotAuthorizedUser = Symbol('kNotAuthorizedUser')

export const applicationErrors = {
  [kInvalidUser]: 'Usuário inválido',
  [kInvalidUserCredentials]: 'E-mail ou senha incorreto',
  [kUserAlreadyExists]: 'Usuário já cadastrado',
  [kMismatchingUserPass]: 'Confirmação de senha incorreta',
  [kNotAuthorizedUser]: 'Usuário não autenticado'
}
