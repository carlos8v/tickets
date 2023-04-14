export const statusClass = {
  OPENED: 'px-2 py-1 text-white rounded-full bg-blue-400',
  ARCHIVED: 'px-2 py-1 text-white rounded-full bg-orange-400',
  RESOLVED: 'px-2 py-1 text-white rounded-full bg-green-400',
  UNRESOLVED: 'px-2 py-1 text-white rounded-full bg-red-400',
} as Record<string, string>

export const statusLabel = {
  OPENED: 'Aberto',
  ARCHIVED: 'Arquivado',
  RESOLVED: 'Resolvido',
  UNRESOLVED: 'Não resolvido',
} as Record<string, string>

export const usersClass = {
  ADMIN: 'px-2 py-1 text-white rounded-full bg-blue-400',
  USER: 'px-2 py-1 text-white rounded-full bg-orange-400',
}

export const usersLabel = {
  ADMIN: 'Administrador',
  USER: 'Usuário',
}

export function getUserImage(nameStr: string) {
  const name = nameStr.split(' ').join('+')
  return `https://ui-avatars.com/api/?rounded=true&background=FF922D&color=fff&name=${name}`
}
