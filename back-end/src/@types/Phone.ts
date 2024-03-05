import { z } from "zod";
import { basicPhoneSchema, phoneWithDetailsSchema, phoneWithVariationsSchema } from "../schemas/phone.schema";

export type BasicPhone = z.infer<typeof basicPhoneSchema>
export type PhoneWithDetails = z.infer<typeof phoneWithDetailsSchema>
export type PhoneWithVariations = z.infer<typeof phoneWithVariationsSchema>
export type Phone = BasicPhone | PhoneWithDetails | PhoneWithVariations