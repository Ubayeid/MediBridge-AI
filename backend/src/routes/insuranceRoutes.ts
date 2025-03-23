import express from 'express';
import {
  createInsurance,
  getInsurances,
  getInsurance,
  updateInsurance,
  deleteInsurance,
  getActiveInsurance,
  addInsuranceDocument,
  removeInsuranceDocument
} from '../controllers/insuranceController';
import { protect } from '../controllers/authController';

const router = express.Router();

// Protect all routes
router.use(protect);

// Get active insurance
router.get('/active', getActiveInsurance);

// Insurance document management
router.patch('/:id/documents', addInsuranceDocument);
router.delete('/:id/documents/:documentId', removeInsuranceDocument);

// Standard CRUD routes
router.route('/')
  .get(getInsurances)
  .post(createInsurance);

router.route('/:id')
  .get(getInsurance)
  .patch(updateInsurance)
  .delete(deleteInsurance);

export default router; 