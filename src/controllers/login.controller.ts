import { RequestHandler } from "express";
import { IUser } from "../@types/User";
import { loginService } from "../services/login.service";

export const loginController:  RequestHandler<unknown, unknown, IUser> = async (req, res) => {
  const token = await loginService(req.body);
  res.status(200).json({token});
};