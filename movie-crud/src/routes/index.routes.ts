import { Router } from 'express';
import authRoutes from './api/auth.routes';
import movieRoutes from './api/movies.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/movies', movieRoutes);

export default router;
