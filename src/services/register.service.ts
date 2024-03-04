import { ModelStatic } from "sequelize";
import { Conflict, UnprocessableEntity } from "../@types/errors";
import { IUser, userSchema } from "../@types/User";
import User from "../database/models/User";
import hash from "../utils/hash";
import { IUserForToken } from "../@types/UserForToken";
import { createToken } from "../utils/jwt";

const model: ModelStatic<User> = User;

export const registerUserService = async ({email, password}: IUser): Promise<string> => {
  const parseResult = userSchema.safeParse({email, password})
  if (!parseResult.success) {
    throw new UnprocessableEntity(parseResult.error.errors[0].message)
  }

  const encryptedPassword = hash(password);
  const [user, created] = await model.findOrCreate({
    where: { email }, 
    defaults: {
      email, 
      password: encryptedPassword
    }
  });
  if (!created) throw new Conflict('Você já está cadastrado');

  const userForToken: IUserForToken = {
    id: user.id,
    email,
  };
  const token = createToken(userForToken);

  return token;
};