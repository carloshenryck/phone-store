import { z } from "zod";

export const loginSchema = z.object({
  email: z.string({required_error: 'O email é obrigatório'}).email('O email passado não é válido'),
  password: z.string({required_error: 'A senha é obrigatória'}).min(6, 'A senha precisa conter pelo menos seis caracteres')
})

export const registerSchema = z.object({
  name: z.string({required_error: 'O nome é obrigatório'}).max(10, 'O nome pode conter no máximo dez caracteres'),
  email: z.string({required_error: 'O email é obrigatório'}).email('O email passado não é válido'),
  password: z.string({required_error: 'A senha é obrigatória'}).min(6, 'A senha precisa conter pelo menos seis caracteres')
})

export type IUserForLogin = z.infer<typeof loginSchema>
export type IUserForRegister = z.infer<typeof registerSchema>
export interface IUserForToken {
  id: number;
  name: string;
  email: string;
}
