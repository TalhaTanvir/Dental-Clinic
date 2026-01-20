const express = require('express');
const {
  getGalleryItems,
  getGalleryGrouped,
  getGalleryItem,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
} = require('../controllers/galleryController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getGalleryItems);
router.get('/grouped', getGalleryGrouped);
router.get('/:id', getGalleryItem);

// Protected routes - only admin can modify
router.post('/', protect, authorize('admin'), createGalleryItem);
router.put('/:id', protect, authorize('admin'), updateGalleryItem);
router.delete('/:id', protect, authorize('admin'), deleteGalleryItem);

module.exports = router;
