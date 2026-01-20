const express = require('express');
const {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentStats
} = require('../controllers/appointmentController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Public route - anyone can create an appointment
router.post('/', createAppointment);

// Protected routes - only authenticated users can access
router.get('/', protect, getAppointments);
router.get('/stats', protect, getAppointmentStats);
router.get('/:id', protect, getAppointment);
router.put('/:id', protect, updateAppointment);
router.delete('/:id', protect, authorize('admin'), deleteAppointment);

module.exports = router;
