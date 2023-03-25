export const kInvalidAuthRequest = Symbol('kInvalidAuthRequest')
export const kInvalidBody = Symbol('kInvalidBody')
export const kUnexpectedError = Symbol('kUnexpectedError')

export const infraErrors = {
  [kInvalidAuthRequest]: 'Cookie de autorização inválido',
  [kInvalidBody]: 'Dados da requisição inválidos',
  [kUnexpectedError]: 'Um erro inesperado ocorreu',
}
