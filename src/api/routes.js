import { Router } from 'express';
import userRouter from './modules/user/index.js';
import taskRouter from './modules/task/index.js';

const router = Router();

router.use('/auth', userRouter);
router.use('/tasks', taskRouter);

export default router;
