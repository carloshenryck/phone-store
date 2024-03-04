import { RequestHandler } from "express"
import { registerUserService } from "../services/register.service"
import { IUser } from "../@types/User"

export const registerUserController: RequestHandler<unknown, unknown, IUser> = async (req, res) => {
  const token = await registerUserService(req.body);
  res.status(200).json({token});
}