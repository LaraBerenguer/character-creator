import { RequestHandler, Router } from 'express';
import { migrateLocalStorageCharacters } from '../controllers/migration'
import { authentication } from '../controllers/auth';

const router = Router();

router.post('/migrate', authentication as RequestHandler, migrateLocalStorageCharacters as RequestHandler);

export default router;