const express = require('express');
const {
  getServices,
  getService,
  getServiceBySlug,
  createService,
  updateService,
  deleteService
} = require('../controllers/serviceController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getServices);
router.get('/slug/:slug', getServiceBySlug);
router.get('/:id', getService);

// Protected routes - only admin can modify
router.post('/', protect, authorize('admin'), createService);
router.put('/:id', protect, authorize('admin'), updateService);
router.delete('/:id', protect, authorize('admin'), deleteService);

module.exports = router;
