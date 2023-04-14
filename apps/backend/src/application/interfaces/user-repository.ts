import type { UserModel } from '@domain/user'

export interface UserRepository {
  save(userData: UserModel): Promise<void>
  findById(id: string): Promise<UserModel | null>
  findByEmail(email: string): Promise<UserModel | null>
  findManyBy(opts: Partial<Pick<UserModel, 'name' | 'email'>>): Promise<UserModel[]>
  setAdmin(userId: string): Promise<void>
}
