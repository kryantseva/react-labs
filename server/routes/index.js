import {Router} from 'express';
import offerRouter from './offerRoutes.js';
import userRouter from './userRoutes.js'


const router = new Router();

router.use('/offers', offerRouter);
router.use('/register', userRouter);

export default router;