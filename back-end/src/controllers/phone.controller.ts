import { RequestHandler } from "express";
import { Phone } from "../@types/Phone";
import { registerPhoneService } from "../services/phone.service";

export const registerPhoneControler: RequestHandler<unknown, unknown, Phone> = async (req, res) => {
  const message = await registerPhoneService(req.body, req.user.id)
  return res.status(200).json({message});
}