import sequelize from "../database/models";
import { ModelStatic } from "sequelize";
import Phone from '../database/models/Phone'
import PhoneAttributes from '../database/models/PhoneAttributes'
import { Phone as PhoneType, PhoneWithVariations } from '../@types/Phone' 
import { normalizePhoneData } from "../utils/normalizePhoneData";
import { InternalServerError, NotFound } from "../@types/express/errors";

const phoneModel: ModelStatic<Phone> = Phone;
const phoneAttributes: ModelStatic<PhoneAttributes> = PhoneAttributes;

export const registerPhoneService = async (phone: PhoneType, userId: number) => {  
  const normalizedPhoneData = normalizePhoneData(phone);
  const { name, brand, model, data} = normalizedPhoneData;
  const transaction =  await sequelize.transaction();

  try {
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
    await transaction.rollback();
    throw new InternalServerError('Algum erro ocorreu, tente novamente mais tarde!')
  }
}

export const getAllPhonesService = async () => {
  const phones = await phoneModel.findAll({
    include: {
      model: phoneAttributes,
      as: 'data',
      attributes: {
        exclude: ['id', 'phoneId']
      }
    },
    attributes: {
      exclude: ['userId']
    }
  });
  
  return phones;
}

export const getUserPhonesService = async (userId: number) => {
  const phones = await phoneModel.findAll({
    include: {
      model: phoneAttributes,
      as: 'data',
      attributes: {
        exclude: ['id', 'phoneId']
      }
    },
    attributes: {
      exclude: ['userId']
    },
    where: {
      userId,
    },
  });
  
  return phones;
}

export const deletePhoneService = async (phoneId: number, userId: number) => {
  const deletedPhone = await Phone.destroy({
    where: {
      id: phoneId,
      userId,
    },
  });

  if (!deletedPhone) {
    throw new NotFound('Celular não encontrado')
  }

  const updatedUserPhones = getUserPhonesService(userId);
  return updatedUserPhones;
};

export const updatePhoneService = async (phoneId: number, userId: number, data: Partial<PhoneWithVariations>) => {
  const phone = await phoneModel.findOne({
    where: {
      userId,
      id: phoneId
    },
  });

  if (!phone) {
    throw new NotFound('Celular não encontrado')
  }

  await phoneModel.update({
    brand: data.brand ?? phone.brand,
    name: data.name ?? phone.name,
    model: data.model ?? phone.model,
  }, {
    where: {
      userId,
      id: phoneId
    },
  })

  const updatedUserPhones = getUserPhonesService(userId);
  return updatedUserPhones;
}