import express from 'express';
import {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
  deleteAppointment,
  getUpcomingAppointments,
  getPastAppointments
} from '../controllers/appointmentController';
import { protect } from '../controllers/authController';

const router = express.Router();

// Protect all routes
router.use(protect);

// Get upcoming and past appointments
router.get('/upcoming', getUpcomingAppointments);
router.get('/past', getPastAppointments);

// Standard CRUD routes
router.route('/')
  .get(getAppointments)
  .post(createAppointment);

router.route('/:id')
  .get(getAppointment)
  .patch(updateAppointment)
  .delete(deleteAppointment);

export default router; 