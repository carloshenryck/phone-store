import { ModelStatic } from "sequelize";
import { Conflict, UnprocessableEntity } from "../@types/errors";
import { IUserForRegister, IUserForToken } from "../@types/User";
import User from "../database/models/User";
import hash from "../utils/hash";
import { createToken } from "../utils/jwt";
import { registerSchema } from "../schemas/user.schema";

const model: ModelStatic<User> = User;

export const registerUserService = async ({name, email, password}: IUserForRegister): Promise<string> => {
  const parseResult = registerSchema.safeParse({name, email, password})
  if (!parseResult.success) {
    throw new UnprocessableEntity(parseResult.error.errors[0].message)
  }

  const encryptedPassword = hash(password);
  const [user, created] = await model.findOrCreate({
    where: { email }, 
    defaults: {
      name,
      email, 
      password: encryptedPassword
    }
  });
  if (!created) throw new Conflict('Você já está cadastrado');

  const userForToken: IUserForToken = {
    id: user.id,
    name,
    email,
  };
  const token = createToken(userForToken);

  return token;
};