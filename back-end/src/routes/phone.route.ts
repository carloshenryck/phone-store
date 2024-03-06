import * as express from 'express';
import { errorHandlerWrapper } from '../middlewares/errorHandler';
import { getAllPhonesController, getUserPhonesController, registerPhoneControler } from '../controllers/phone.controller';
import validateToken from '../middlewares/tokenValidator';

const router = express.Router();

router.get('/getAll', validateToken, errorHandlerWrapper(getAllPhonesController));
router.get('/getUserPhones', validateToken, errorHandlerWrapper(getUserPhonesController));
router.post('/', validateToken, errorHandlerWrapper(registerPhoneControler));

export default router;