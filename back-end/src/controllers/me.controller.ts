import { Request, Response } from "express";
import { getUserService } from "../services/me.service";

export const getUserController = async (req: Request, res: Response) => {
  const data = await getUserService(req.user.id);
  res.status(200).json({data});
}