import express from 'express';
import { register, login,test } from '../controllers/authController.js';

const router = express.Router();

router.get('/test',test)
router.post('/register', register);
router.post('/login', login);

export default router;
