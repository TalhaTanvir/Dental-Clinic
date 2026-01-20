const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add your name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number'],
    maxlength: [20, 'Phone number cannot be longer than 20 characters']
  },
  service: {
    type: String,
    enum: ['checkup', 'cleaning', 'whitening', 'cosmetic', 'implants', 'orthodontics', 'emergency', 'other'],
    default: 'checkup'
  },
  preferredDate: {
    type: Date
  },
  preferredTime: {
    type: String,
    enum: ['morning', 'afternoon', 'evening', 'flexible'],
    default: 'flexible'
  },
  isNewPatient: {
    type: String,
    enum: ['yes', 'no', ''],
    default: ''
  },
  message: {
    type: String,
    maxlength: [1000, 'Message cannot be more than 1000 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot be more than 500 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
