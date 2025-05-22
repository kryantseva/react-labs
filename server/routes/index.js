import {Router} from 'express';
import offerRouter from './offerRoutes.js';
import userRouter from './userRoutes.js'
import reviewRouter from './reviewRoutes.js'

const router = new Router();

router.use('/offers', offerRouter);
router.use('/register', userRouter);
router.use('/comments', reviewRouter);

export default router;