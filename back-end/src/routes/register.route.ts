import * as express from 'express';
import { errorHandlerWrapper } from '../middlewares/errorHandler';
import { registerUserController } from '../controllers/register.controller';

const router = express.Router();

router.post('/', errorHandlerWrapper(registerUserController))

export default router;