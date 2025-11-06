import { Router } from 'express';
import { auth } from '../../../middleware/auth.js';
import { validate } from '../../../middleware/validate.js';
import * as v from './task.validation.js';
import * as c from './task.controller.js';

const router = Router();

router.post('/', auth(), validate(v.createTask), c.createTask);
router.get('/', auth(), validate(v.getTasksQuery), c.getTasks);
router.get('/stats', auth(), c.stats);
router.get('/search', auth(), c.search);
router.get('/:id', auth(), c.getTask);
router.put('/:id', auth(), validate(v.updateTask), c.updateTask);
router.delete('/:id', auth(), c.deleteTask);
router.patch('/:id/status', auth(), validate(v.updateStatus), c.patchStatus);

export default router;
