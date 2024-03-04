import User from "../database/models/User";
import { ModelStatic } from "sequelize";
import { IUser, userSchema } from "../@types/User";
import { IUserForToken } from "../@types/UserForToken";
import { Unauthorized, UnprocessableEntity } from "../@types/errors";
import { createToken } from "../utils/jwt";
import hash from "../utils/hash";

const model: ModelStatic<User> = User;

export const loginService = async ({email, password}: IUser): Promise<string> => {
  const parseResult = userSchema.safeParse({email, password});
  if (!parseResult.success) {
    throw new UnprocessableEntity(parseResult.error.errors[0].message);
  }

  const user = await model.findOne({ where: { email } });
  if (!user || hash(password) !== user.password ) {
    throw new Unauthorized('Email ou senha estão incorretos');
  }

  const userForToken: IUserForToken = {
    id: user.id,
    email,
  };
  const token = createToken(userForToken);
  return token;
}