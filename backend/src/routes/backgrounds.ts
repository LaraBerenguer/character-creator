import {RequestHandler, Router} from 'express';
import {getBackgroundsByType, createBackground} from "../controllers/background";

const router = Router();

router.get('/:id', getBackgroundsByType as RequestHandler);
router.post('/', createBackground as RequestHandler);

export default router;