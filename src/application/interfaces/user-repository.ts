import type { UserModel } from '@domain/user'

export interface UserRepository {
  save(userData: UserModel): Promise<void>
}
