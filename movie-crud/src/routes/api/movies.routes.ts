import { Router } from 'express';
import {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} from '../../controllers/movies.controller';
import {
  authenticate,
  requireRole,
} from '../../../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/',     getAllMovies);
router.get('/:id',  getMovieById);
router.post('/',    createMovie);
router.put('/:id',  updateMovie);
router.delete('/:id', requireRole('MANAGER'), deleteMovie);

export default router;
