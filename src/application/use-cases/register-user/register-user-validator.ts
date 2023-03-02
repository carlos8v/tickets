import z from 'zod'

export const registerUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string()
})

export type RegisterUserSchema = z.infer<typeof registerUserSchema>
export type RegisterUserValidator = typeof registerUserSchema
