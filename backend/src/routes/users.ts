import { Router, RequestHandler } from 'express';
import { getUser } from "../controllers/user";
import { authentication } from '../controllers/auth';

const router = Router();

router.get('/user', authentication as RequestHandler, getUser as RequestHandler);

export default router;