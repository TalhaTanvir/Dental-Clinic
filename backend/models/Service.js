const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: [true, 'Please add a slug'],
    unique: true,
    lowercase: true,
    trim: true
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  details: {
    type: String,
    maxlength: [2000, 'Details cannot be more than 2000 characters']
  },
  features: [{
    type: String,
    maxlength: [100, 'Feature cannot be more than 100 characters']
  }],
  icon: {
    type: String,
    default: 'default-service-icon'
  },
  image: {
    type: String
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
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
ServiceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Service', ServiceSchema);
