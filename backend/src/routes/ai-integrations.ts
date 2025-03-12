import {RequestHandler, Router} from 'express';
import {generateCharacterDescription} from "../controllers/ai-integration";
import { authentication } from '../controllers/auth';

const router = Router();

router.post('/', authentication as RequestHandler, generateCharacterDescription as RequestHandler);

export default router;