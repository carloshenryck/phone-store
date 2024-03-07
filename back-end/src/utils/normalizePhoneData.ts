import { BasicPhone, PhoneWithDetails, PhoneWithVariations } from "../@types/Phone";
import { isPhoneWithDetails, isPhoneWithVariations, isBasicPhone } from "./verifyPhoneInterface";
import { basicPhoneSchema, phoneWithDetailsSchema, phoneWithVariationsSchema } from "../schemas/phone.schema";
import { UnprocessableEntity } from "../@types/express/errors";
import { ZodError } from "zod";

export const normalizePhoneData = (
  phone: PhoneWithDetails | PhoneWithVariations | BasicPhone
): PhoneWithVariations => {
  let normalizedPhoneData: PhoneWithVariations | undefined;

  try {
    if (isBasicPhone(phone)) {
      basicPhoneSchema.parse(phone);
      const {color, price, ...rest} = phone;
      normalizedPhoneData = {
        ...rest,
        data: [
          {
            color: phone.color,
            price: phone.price,
            img: phone.img
          }
        ]
      }
    }

    if (isPhoneWithDetails(phone)) {
      phoneWithDetailsSchema.parse(phone);
      normalizedPhoneData = {
        name: phone.name,
        brand: phone.details.brand,
        model: phone.details.brand,
        data: [
          {
            color: phone.details.color,
            price: phone.price,
            img: phone.img
          }
        ]
      }
    } 

    if (isPhoneWithVariations(phone)) {
      phoneWithVariationsSchema.parse(phone);
      normalizedPhoneData = phone
    } 

    if (!normalizedPhoneData) {
      throw new UnprocessableEntity('Os dados passados estão incompletos');
    }

    return normalizedPhoneData;
  } catch (error) {
    if (error instanceof ZodError) {
      throw new UnprocessableEntity(error.errors[0].message);
    }
    throw new UnprocessableEntity('Os dados passados estão incompletos');
  }
}