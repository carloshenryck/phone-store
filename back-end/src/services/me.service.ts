import { ModelStatic } from "sequelize";
import User from "../database/models/User";

const userModel: ModelStatic<User> = User;

export const getUserService = async (userId: number) => {
  const user = await userModel.findByPk(userId, {
    attributes: {
      exclude: ['id', 'password']
    }
  })
  return user;
}