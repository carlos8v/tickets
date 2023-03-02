import z from 'zod'

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

export type LoginUserSchema = z.infer<typeof loginUserSchema>
export type LoginUserValidator = typeof loginUserSchema
