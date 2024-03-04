import * as jwt from 'jsonwebtoken';
import { IUserForToken } from '../@types/UserForToken';

export const verifyToken = (token: string): IUserForToken => {
  const { JWT_SECRET } = process.env;
  return jwt.verify(token, JWT_SECRET as string) as IUserForToken;
};

export const createToken = (user: IUserForToken): string => {
  const token = jwt.sign(user, process.env.JWT_SECRET as string);
  return token;
};