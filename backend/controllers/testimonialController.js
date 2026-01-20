const Testimonial = require('../models/Testimonial');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
exports.getTestimonials = asyncHandler(async (req, res, next) => {
  const { approved, featured, service } = req.query;
  
  let query = {};
  
  if (approved === 'true') {
    query.isApproved = true;
  }
  
  if (featured === 'true') {
    query.isFeatured = true;
  }
  
  if (service && service !== 'all') {
    query.service = service;
  }

  const testimonials = await Testimonial.find(query).sort('-createdAt');

  res.status(200).json({
    success: true,
    count: testimonials.length,
    data: testimonials
  });
});

// @desc    Get featured testimonials (for homepage)
// @route   GET /api/testimonials/featured
// @access  Public
exports.getFeaturedTestimonials = asyncHandler(async (req, res, next) => {
  const testimonials = await Testimonial.find({
    isApproved: true,
    isFeatured: true
  })
    .sort('-createdAt')
    .limit(3);

  res.status(200).json({
    success: true,
    count: testimonials.length,
    data: testimonials
  });
});

// @desc    Get single testimonial
// @route   GET /api/testimonials/:id
// @access  Public
exports.getTestimonial = asyncHandler(async (req, res, next) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    return res.status(404).json({
      success: false,
      message: 'Testimonial not found'
    });
  }

  res.status(200).json({
    success: true,
    data: testimonial
  });
});

// @desc    Create new testimonial
// @route   POST /api/testimonials
// @access  Public (user submitted testimonial, needs approval)
exports.createTestimonial = asyncHandler(async (req, res, next) => {
  // New testimonials are not approved by default
  req.body.isApproved = false;
  req.body.isFeatured = false;

  const testimonial = await Testimonial.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Thank you for your testimonial! It will be reviewed shortly.',
    data: testimonial
  });
});

// @desc    Update testimonial
// @route   PUT /api/testimonials/:id
// @access  Private/Admin
exports.updateTestimonial = asyncHandler(async (req, res, next) => {
  let testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    return res.status(404).json({
      success: false,
      message: 'Testimonial not found'
    });
  }

  testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: testimonial
  });
});

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private/Admin
exports.deleteTestimonial = asyncHandler(async (req, res, next) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    return res.status(404).json({
      success: false,
      message: 'Testimonial not found'
    });
  }

  await testimonial.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
    message: 'Testimonial deleted successfully'
  });
});

// @desc    Approve testimonial
// @route   PUT /api/testimonials/:id/approve
// @access  Private/Admin
exports.approveTestimonial = asyncHandler(async (req, res, next) => {
  let testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    return res.status(404).json({
      success: false,
      message: 'Testimonial not found'
    });
  }

  testimonial = await Testimonial.findByIdAndUpdate(
    req.params.id,
    { isApproved: true },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: 'Testimonial approved',
    data: testimonial
  });
});
