import {RequestHandler, Router} from 'express';
import { getPublicBackgroundsByType } from '../controllers/public-backgrounds';

const router = Router();

router.get('/', getPublicBackgroundsByType as RequestHandler);

export default router;