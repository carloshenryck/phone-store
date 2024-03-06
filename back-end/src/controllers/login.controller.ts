import { RequestHandler } from "express";
import { IUserForLogin } from "../@types/User";
import { loginService } from "../services/login.service";

export const loginController:  RequestHandler<unknown, unknown, IUserForLogin> = async (req, res) => {
  const data = await loginService(req.body);
  res.status(200).json({data});
};