import * as express from 'express';
import { errorHandlerWrapper } from '../middlewares/errorHandler';
import { getUserController } from '../controllers/me.controller';
import validateToken from '../middlewares/tokenValidator';

const router = express.Router();

router.get('/', validateToken, errorHandlerWrapper(getUserController))

export default router;