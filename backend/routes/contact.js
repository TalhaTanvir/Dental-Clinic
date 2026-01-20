const express = require('express');
const {
  getMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
  markAsRead
} = require('../controllers/contactController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Public route - anyone can send a message
router.post('/', createMessage);

// Protected routes - only admin can access
router.get('/', protect, authorize('admin'), getMessages);
router.get('/:id', protect, authorize('admin'), getMessage);
router.put('/:id', protect, authorize('admin'), updateMessage);
router.put('/:id/read', protect, authorize('admin'), markAsRead);
router.delete('/:id', protect, authorize('admin'), deleteMessage);

module.exports = router;
