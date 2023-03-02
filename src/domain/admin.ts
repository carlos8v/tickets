import { randomUUID } from 'crypto'
import type { OptionalProps } from './utils/optional-props'

export type AdminModel = {
  id: string
  userId: string
  createdAt: Date | string
}

type OptionalCreateProps = 'id' | 'createdAt'
export type CreateAdminProps = OptionalProps<AdminModel, OptionalCreateProps>

export const makeAdmin = (adminData: CreateAdminProps): AdminModel => ({
  id: adminData?.id || randomUUID(),
  userId: adminData.userId,
  createdAt: adminData?.createdAt || new Date(),
})
