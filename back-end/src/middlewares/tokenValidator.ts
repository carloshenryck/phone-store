import { Request, Response, NextFunction } from 'express';
import { Unauthorized } from '../@types/errors';
import { verifyToken } from '../utils/jwt';

const validateToken = (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if (!authorization) {
    throw new Unauthorized('Faça login para acessar');
  }

  try {
    const user = verifyToken(authorization);
    req.user = user;
    next();
  } catch (e) {
    throw new Unauthorized('Faça login novamente para acessar');
  }
};

export default validateToken;