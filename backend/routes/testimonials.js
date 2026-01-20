const express = require('express');
const {
  getTestimonials,
  getFeaturedTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  approveTestimonial
} = require('../controllers/testimonialController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getTestimonials);
router.get('/featured', getFeaturedTestimonials);
router.get('/:id', getTestimonial);
router.post('/', createTestimonial); // Users can submit testimonials

// Protected routes - only admin can modify/approve
router.put('/:id', protect, authorize('admin'), updateTestimonial);
router.put('/:id/approve', protect, authorize('admin'), approveTestimonial);
router.delete('/:id', protect, authorize('admin'), deleteTestimonial);

module.exports = router;
