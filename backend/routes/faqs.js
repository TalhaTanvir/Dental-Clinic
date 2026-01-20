const express = require('express');
const {
  getFAQs,
  getFAQsGrouped,
  getFAQ,
  createFAQ,
  updateFAQ,
  deleteFAQ
} = require('../controllers/faqController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getFAQs);
router.get('/grouped', getFAQsGrouped);
router.get('/:id', getFAQ);

// Protected routes - only admin can modify
router.post('/', protect, authorize('admin'), createFAQ);
router.put('/:id', protect, authorize('admin'), updateFAQ);
router.delete('/:id', protect, authorize('admin'), deleteFAQ);

module.exports = router;
