import { RequestHandler, Request, Response } from "express";
import { Phone } from "../@types/Phone";
import { deletePhoneService, getAllPhonesService, getUserPhonesService, registerPhoneService } from "../services/phone.service";

export const registerPhoneControler: RequestHandler<unknown, unknown, Phone> = async (req, res) => {
  const message = await registerPhoneService(req.body, req.user.id)
  return res.status(200).json({message});
}

export const getAllPhonesController = async (_req: Request, res: Response) => {
  const phones = await getAllPhonesService();
  res.status(200).json({data: phones});
}

export const getUserPhonesController = async (req: Request, res: Response) => {
  const phones = await getUserPhonesService(req.user.id);
  res.status(200).json({data: phones});
}

export const deletePhoneController = async (req: Request, res: Response) => {
  const { phoneId } = req.params
  const message = await deletePhoneService(+phoneId, req.user.id);
  res.status(200).json({message});
}