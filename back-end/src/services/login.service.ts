import User from "../database/models/User";
import { ModelStatic } from "sequelize";
import { IUserForLogin, IUserForToken } from "../@types/User";
import { Unauthorized, UnprocessableEntity } from "../@types/errors";
import { createToken } from "../utils/jwt";
import hash from "../utils/hash";
import { loginSchema } from "../schemas/user.schema";

const model: ModelStatic<User> = User;

export const loginService = async ({ email, password }: IUserForLogin): Promise<string> => {
  const parseResult = loginSchema.safeParse({email, password});
  if (!parseResult.success) {
    throw new UnprocessableEntity(parseResult.error.errors[0].message);
  }

  const user = await model.findOne({ where: { email } });
  if (!user || hash(password) !== user.password ) {
    throw new Unauthorized('Email ou senha estão incorretos');
  }

  const userForToken: IUserForToken = {
    id: user.id,
    name: user.name,
    email,
  };
  const token = createToken(userForToken);
  return token;
}