import * as express from 'express';
import { errorHandlerWrapper } from '../middlewares/errorHandler';
import { registerPhoneControler } from '../controllers/phone.controller';
import validateToken from '../middlewares/tokenValidator';

const router = express.Router();

router.post('/', validateToken, errorHandlerWrapper(registerPhoneControler));

export default router;