import express from 'express';
import { register, login, protect, restrictTo } from '../controllers/authController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Protect all routes after this middleware
router.use(protect);

// Routes that require authentication
router.post('/logout', (req, res) => {
  res.status(200).json({ status: 'success' });
});

// Routes that require admin role
router.use(restrictTo('admin'));

export default router; 