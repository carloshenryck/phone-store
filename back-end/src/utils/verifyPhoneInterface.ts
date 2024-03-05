import { PhoneWithDetails, PhoneWithVariations, BasicPhone } from "../@types/Phone";

export const isBasicPhone = (
  phone: PhoneWithDetails | PhoneWithVariations | BasicPhone
): phone is BasicPhone => {
  return 'color' in phone;
}

export const isPhoneWithDetails = (
  phone: PhoneWithDetails | PhoneWithVariations | BasicPhone
): phone is PhoneWithDetails => {
  return 'details' in phone;
}

export const isPhoneWithVariations = (
  phone: PhoneWithDetails | PhoneWithVariations | BasicPhone
): phone is PhoneWithVariations => {
  return 'data' in phone;
}