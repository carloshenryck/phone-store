import { RequestHandler, Request, Response } from "express";
import { Phone, PhoneWithVariations } from "../@types/Phone";
import { deletePhoneService, getAllPhonesService, getUserPhonesService, registerPhoneService, updatePhoneService } from "../services/phone.service";

export const registerPhoneControler: RequestHandler<unknown, unknown, Phone> = async (req, res) => {
  const message = await registerPhoneService(req.body, req.user.id)
  return res.status(200).json({message});
}

export const getAllPhonesController = async (_req: Request, res: Response) => {
  const data = await getAllPhonesService();
  res.status(200).json({data: data});
}

export const getUserPhonesController = async (req: Request, res: Response) => {
  const data = await getUserPhonesService(req.user.id);
  res.status(200).json({data: data});
}

export const deletePhoneController = async (req: Request, res: Response) => {
  const { phoneId } = req.params
  const data = await deletePhoneService(+phoneId, req.user.id);
  res.status(200).json({data});
}

export const updatePhoneController: RequestHandler<unknown, unknown, PhoneWithVariations> = async (req, res) => {
  const { phoneId } = req.params as {phoneId: string};
  const data = await updatePhoneService(+phoneId, req.user.id, req.body);
  res.status(200).json({data});
}