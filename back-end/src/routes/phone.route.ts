import * as express from 'express';
import { errorHandlerWrapper } from '../middlewares/errorHandler';
import { 
  deletePhoneController, 
  getAllPhonesController, 
  getUserPhonesController, 
  registerPhoneControler, 
  updatePhoneController
} from '../controllers/phone.controller';
import validateToken from '../middlewares/tokenValidator';

const router = express.Router();

router.get('/getAll', validateToken, errorHandlerWrapper(getAllPhonesController));
router.get('/getUserPhones', validateToken, errorHandlerWrapper(getUserPhonesController));
router.post('/', validateToken, errorHandlerWrapper(registerPhoneControler));
router.delete('/:phoneId', validateToken, errorHandlerWrapper(deletePhoneController));
router.patch('/:phoneId', validateToken, errorHandlerWrapper(updatePhoneController));

export default router;