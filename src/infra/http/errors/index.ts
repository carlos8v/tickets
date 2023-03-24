export const kMissingAuthHeader = Symbol('kMissingAuthHeader')
export const kInvalidBody = Symbol('kInvalidBody')
export const kUnexpectedError = Symbol('kUnexpectedError')

export const infraErrors = {
  [kMissingAuthHeader]: 'Header de autorização faltando',
  [kInvalidBody]: 'Dados da requisição inválidos',
  [kUnexpectedError]: 'Um erro inesperado ocorreu',
}
