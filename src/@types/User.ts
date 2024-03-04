import { z } from "zod";

export const userSchema = z.object({
  email: z.string({required_error: 'O email é obrigatório'}).email('O email passado não é válido'),
  password: z.string({required_error: 'A senha é obrigatória'}).min(6, 'A senha precisa conter pelo menos seis caracteres')
})

export type IUser = z.infer<typeof userSchema>