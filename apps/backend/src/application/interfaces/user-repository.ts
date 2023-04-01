import type { UserModel } from '@domain/user'

export interface UserRepository {
  save(userData: UserModel): Promise<void>
  findById(id: string): Promise<UserModel | null>
  findByEmail(email: string): Promise<UserModel | null>
  setAdmin(userId: string): Promise<void>
}
