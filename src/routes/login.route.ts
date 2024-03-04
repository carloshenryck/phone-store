import * as express from 'express';
import { errorHandlerWrapper } from '../middlewares/errorHandler';
import { loginController } from '../controllers/login.controller';

const router = express.Router();

router.post('/', errorHandlerWrapper(loginController))

export default router;