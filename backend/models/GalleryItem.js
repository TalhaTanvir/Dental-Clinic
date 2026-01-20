const mongoose = require('mongoose');

const GalleryItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  category: {
    type: String,
    enum: ['office', 'smiles', 'team', 'technology'],
    required: [true, 'Please add a category'],
    default: 'office'
  },
  image: {
    type: String
  },
  beforeImage: {
    type: String
  },
  afterImage: {
    type: String
  },
  role: {
    type: String,
    maxlength: [100, 'Role cannot be more than 100 characters']
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

module.exports = mongoose.model('GalleryItem', GalleryItemSchema);
