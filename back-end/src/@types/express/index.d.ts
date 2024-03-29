import { IUserForToken } from "../User";

declare global {
  namespace Express {
    export interface Request {
      user: IUserForToken
    }
  }
}