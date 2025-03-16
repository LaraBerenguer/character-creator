import {RequestHandler, Router} from 'express';
import {getBackgroundsByType, createBackground, getBackgroundsById} from "../controllers/background";
import { authentication } from '../controllers/auth';

const router = Router();

router.get('/', authentication as RequestHandler, getBackgroundsByType as RequestHandler);
router.get('/:id', authentication as RequestHandler, getBackgroundsById as RequestHandler);
router.post('/', authentication as RequestHandler, createBackground as RequestHandler);

export default router;