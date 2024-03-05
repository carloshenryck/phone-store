import sequelize from "../database/models";
import { ModelStatic } from "sequelize";
import Phone from '../database/models/Phone'
import PhoneAttributes from '../database/models/PhoneAttributes'
import { Phone as PhoneType } from '../@types/Phone' 
import { normalizePhoneData } from "../utils/normalizePhoneData";
import { InternalServerError } from "../@types/errors";

const phoneModel: ModelStatic<Phone> = Phone;
const phoneAttributes: ModelStatic<PhoneAttributes> = PhoneAttributes

export const registerPhoneService = async (phone: PhoneType, userId: number) => {  
  const normalizedPhoneData = normalizePhoneData(phone);
  const { name, brand, model, data} = normalizedPhoneData

  try {
    const transaction =  await sequelize.transaction();
    const phone = await phoneModel.create(
      { name, brand, model, userId }, 
      { transaction }
    );
    await Promise.all(data.map(async (variation) => {
      return await phoneAttributes.create(
        { 
          price: variation.price, 
          color: variation.color, 
          phoneId: phone.id
        }, 
        { transaction }
      );
    }));

    await transaction.commit()
    return 'Adicionado com sucesso'
  } catch (error) {
    throw new InternalServerError('Algum erro ocorreu, tente novamente mais tarde!')
  }
}