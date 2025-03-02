import {RequestHandler, Router} from 'express';
import {createUser} from "../controllers/auth";

const router = Router();

router.post('/', createUser as RequestHandler);

export default router;