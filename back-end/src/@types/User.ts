import { z } from "zod";
import { loginSchema, registerSchema } from "../schemas/user.schema";

export type IUserForLogin = z.infer<typeof loginSchema>
export type IUserForRegister = z.infer<typeof registerSchema>
export interface IUserForToken {
  id: number;
  name: string;
  email: string;
}
