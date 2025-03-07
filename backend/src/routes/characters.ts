import { RequestHandler, Router } from 'express';
import { getCharacters, getCharactersById, createCharacter, deleteCharacter } from "../controllers/characters";
import { authentication } from '../controllers/auth';

const router = Router();

router.get('/', authentication as RequestHandler, getCharacters as RequestHandler);
router.get('/:id', authentication as RequestHandler, getCharactersById as RequestHandler);
router.post('/', authentication as RequestHandler, createCharacter as RequestHandler);
router.delete('/:id', authentication as RequestHandler, deleteCharacter as RequestHandler);

export default router;