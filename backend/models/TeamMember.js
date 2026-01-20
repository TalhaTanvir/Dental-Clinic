const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  role: {
    type: String,
    required: [true, 'Please add a role'],
    trim: true,
    maxlength: [100, 'Role cannot be more than 100 characters']
  },
  bio: {
    type: String,
    maxlength: [1000, 'Bio cannot be more than 1000 characters']
  },
  initials: {
    type: String,
    maxlength: [5, 'Initials cannot be more than 5 characters']
  },
  image: {
    type: String
  },
  credentials: [{
    title: {
      type: String,
      maxlength: [200, 'Credential title cannot be more than 200 characters']
    },
    institution: {
      type: String,
      maxlength: [200, 'Institution cannot be more than 200 characters']
    },
    year: {
      type: String,
      maxlength: [10, 'Year cannot be more than 10 characters']
    }
  }],
  memberships: [{
    type: String,
    maxlength: [200, 'Membership cannot be more than 200 characters']
  }],
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

module.exports = mongoose.model('TeamMember', TeamMemberSchema);
