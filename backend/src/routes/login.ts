import {RequestHandler, Router} from 'express';
import {loginUser} from "../controllers/auth";

const router = Router();

router.post('/', loginUser as RequestHandler);

export default router;