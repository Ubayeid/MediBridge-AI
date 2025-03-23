import express from 'express';
import {
  createHealthRecord,
  getHealthRecords,
  getHealthRecord,
  updateHealthRecord,
  deleteHealthRecord,
  getHealthRecordsByType,
  shareHealthRecord,
  removeSharedAccess
} from '../controllers/healthRecordController';
import { protect } from '../controllers/authController';

const router = express.Router();

// Protect all routes
router.use(protect);

// Get health records by type
router.get('/type/:type', getHealthRecordsByType);

// Share and unshare health records
router.patch('/:id/share', shareHealthRecord);
router.patch('/:id/unshare', removeSharedAccess);

// Standard CRUD routes
router.route('/')
  .get(getHealthRecords)
  .post(createHealthRecord);

router.route('/:id')
  .get(getHealthRecord)
  .patch(updateHealthRecord)
  .delete(deleteHealthRecord);

export default router; 