const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  role: {
    type: String,
    trim: true,
    maxlength: [100, 'Role cannot be more than 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Please add testimonial content'],
    maxlength: [1000, 'Content cannot be more than 1000 characters']
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5'],
    default: 5
  },
  service: {
    type: String,
    enum: ['general', 'cosmetic', 'pediatric', 'restorative', 'implants', 'orthodontics', 'emergency', 'whitening'],
    default: 'general'
  },
  initials: {
    type: String,
    maxlength: [5, 'Initials cannot be more than 5 characters']
  },
  image: {
    type: String
  },
  date: {
    type: String,
    maxlength: [50, 'Date string cannot be more than 50 characters']
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);
