import { randomUUID } from 'crypto'
import { compare, hash } from 'bcrypt'
import type { OptionalProps } from './utils/optional-props'

export type UserModel = {
  id: string
  admin: boolean
  name: string
  password: string
  email: string
  createdAt: Date | string
  deletedAt?: Date | string
}

type OptionalCreateProps = 'id' | 'admin' | 'createdAt' | 'deletedAt'
export type CreateUserProps = OptionalProps<UserModel, OptionalCreateProps>

export const makeUser = (userData: CreateUserProps): UserModel => ({
  id: userData?.id || randomUUID(),
  admin: userData?.admin || false,
  name: userData.name,
  email: userData.email,
  password: userData.password,
  createdAt: userData?.createdAt || new Date(),
  deletedAt: userData?.deletedAt || undefined
})

const saltRound = 10

export const comparePassword = async (pass: string, hashedPass: string) => compare(pass, hashedPass)
export const hashPass = async (pass: string) => hash(pass, saltRound)
