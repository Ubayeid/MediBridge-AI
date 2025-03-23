import express from 'express';
import {
  getMe,
  updateMe,
  deleteMe,
  updatePassword,
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/userController';
import { protect, restrictTo } from '../controllers/authController';

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

// Routes for current user
router.get('/me', getMe);
router.patch('/updateMe', updateMe);
router.delete('/deleteMe', deleteMe);
router.patch('/updateMyPassword', updatePassword);

// Admin only routes
router.use(restrictTo('admin'));

router.route('/')
  .get(getAllUsers)
  .post(createUser);

router.route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

export default router; 