import { Router } from 'express';
import { validate } from '../../../middleware/validate.js';
import { registerSchema, loginSchema, refreshSchema } from './user.validation.js';
import * as ctrl from './user.controller.js';

const router = Router();

router.post('/register', validate(registerSchema), ctrl.register);
router.post('/login', validate(loginSchema), ctrl.login);
router.post('/refresh', validate(refreshSchema), ctrl.refresh);
router.post('/logout', ctrl.logout);



export default router;

