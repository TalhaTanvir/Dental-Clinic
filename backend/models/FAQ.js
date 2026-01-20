const mongoose = require('mongoose');

const FAQSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Please add a question'],
    trim: true,
    maxlength: [500, 'Question cannot be more than 500 characters']
  },
  answer: {
    type: String,
    required: [true, 'Please add an answer'],
    maxlength: [2000, 'Answer cannot be more than 2000 characters']
  },
  category: {
    type: String,
    enum: ['general', 'appointments', 'insurance', 'procedures', 'emergency'],
    default: 'general'
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FAQ', FAQSchema);
