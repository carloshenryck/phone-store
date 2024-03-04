import { ModelStatic } from "sequelize";
import { Conflict } from "../@types/errors";
import { IUser } from "../@types/User";
import User from "../database/models/User";
import hash from "../utils/hash";

const model: ModelStatic<User> = User;

export const registerUserService = async ({email, password}: IUser): Promise<string> => {
  const encryptedPassword = hash(password);
  const [user, created] = await model.findOrCreate({
    where: { email }, 
    defaults: {
      email, 
      password: encryptedPassword
    }
  });
  if (!created) throw new Conflict('Você já está cadastrado');
  return 'Created';
};