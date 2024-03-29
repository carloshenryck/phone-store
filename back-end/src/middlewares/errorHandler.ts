import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Express,
} from 'express';
import BaseError from '../@types/express/errors/BaseError';

export const createErrorHandler = (app: Express) => {
  app.use((err: BaseError, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof BaseError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    res.status(500).json({ message: 'Internal Server Error' });
  });
};

export const errorHandlerWrapper = (controllerFn: RequestHandler) => (
  (req: Request, res: Response, next: NextFunction) => (
    Promise.resolve(controllerFn(req, res, next)).catch((e) => next(e))
  )
);