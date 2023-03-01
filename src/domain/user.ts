import { randomUUID } from 'crypto'
import { compare, hash } from 'bcrypt'
import type { OptionalProps } from './utils/optional-props'

type UserModel = {
  id: string
  name: string
  password: string
  email: string
  createdAt: Date | string
}

type OptionalCreateProps = 'id' | 'createdAt'
export type CreateUserProps = OptionalProps<UserModel, OptionalCreateProps>

export const makeUser = (userData: CreateUserProps): UserModel => ({
  id: userData?.id || randomUUID(),
  name: userData.name,
  email: userData.email,
  password: userData.password,
  createdAt: userData?.createdAt || new Date(),
})

const saltRound = 10

export const comparePassword = async (pass: string, hashedPass: string) => compare(pass, hashedPass)
export const hashPass = async (pass: string) => hash(pass, saltRound)
