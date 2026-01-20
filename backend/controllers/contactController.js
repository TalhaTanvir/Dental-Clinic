const ContactMessage = require('../models/ContactMessage');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private/Admin
exports.getMessages = asyncHandler(async (req, res, next) => {
  const { read, replied } = req.query;
  
  let query = {};
  
  if (read === 'true') {
    query.isRead = true;
  } else if (read === 'false') {
    query.isRead = false;
  }
  
  if (replied === 'true') {
    query.isReplied = true;
  } else if (replied === 'false') {
    query.isReplied = false;
  }

  const messages = await ContactMessage.find(query).sort('-createdAt');

  res.status(200).json({
    success: true,
    count: messages.length,
    data: messages
  });
});

// @desc    Get single contact message
// @route   GET /api/contact/:id
// @access  Private/Admin
exports.getMessage = asyncHandler(async (req, res, next) => {
  const message = await ContactMessage.findById(req.params.id);

  if (!message) {
    return res.status(404).json({
      success: false,
      message: 'Message not found'
    });
  }

  res.status(200).json({
    success: true,
    data: message
  });
});

// @desc    Create new contact message
// @route   POST /api/contact
// @access  Public
exports.createMessage = asyncHandler(async (req, res, next) => {
  const message = await ContactMessage.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Message sent successfully! We will get back to you soon.',
    data: message
  });
});

// @desc    Update contact message (mark as read/replied)
// @route   PUT /api/contact/:id
// @access  Private/Admin
exports.updateMessage = asyncHandler(async (req, res, next) => {
  let message = await ContactMessage.findById(req.params.id);

  if (!message) {
    return res.status(404).json({
      success: false,
      message: 'Message not found'
    });
  }

  message = await ContactMessage.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: message
  });
});

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private/Admin
exports.deleteMessage = asyncHandler(async (req, res, next) => {
  const message = await ContactMessage.findById(req.params.id);

  if (!message) {
    return res.status(404).json({
      success: false,
      message: 'Message not found'
    });
  }

  await message.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
    message: 'Message deleted successfully'
  });
});

// @desc    Mark message as read
// @route   PUT /api/contact/:id/read
// @access  Private/Admin
exports.markAsRead = asyncHandler(async (req, res, next) => {
  let message = await ContactMessage.findById(req.params.id);

  if (!message) {
    return res.status(404).json({
      success: false,
      message: 'Message not found'
    });
  }

  message = await ContactMessage.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true }
  );

  res.status(200).json({
    success: true,
    data: message
  });
});
