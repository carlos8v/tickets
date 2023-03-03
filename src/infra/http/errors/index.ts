export const kInvalidBody = Symbol('kInvalidBody')
export const kUnexpectedError = Symbol('kUnexpectedError')

export const infraErrors = {
  [kInvalidBody]: 'Dados da requisição inválidos',
  [kUnexpectedError]: 'Um erro inesperado ocorreu'
}
