import { RequestHandler } from "express"
import { registerUserService } from "../services/register.service"
import { IUserForRegister } from "../@types/User"

export const registerUserController: RequestHandler<unknown, unknown, IUserForRegister> = async (req, res) => {
  const token = await registerUserService(req.body);
  res.status(200).json({token});
}