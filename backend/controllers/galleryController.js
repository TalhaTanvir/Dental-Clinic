const GalleryItem = require('../models/GalleryItem');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get all gallery items
// @route   GET /api/gallery
// @access  Public
exports.getGalleryItems = asyncHandler(async (req, res, next) => {
  const { category, active } = req.query;
  
  let query = {};
  
  if (active === 'true') {
    query.isActive = true;
  }
  
  if (category && category !== 'all') {
    query.category = category;
  }

  const galleryItems = await GalleryItem.find(query).sort('category order');

  res.status(200).json({
    success: true,
    count: galleryItems.length,
    data: galleryItems
  });
});

// @desc    Get gallery items grouped by category
// @route   GET /api/gallery/grouped
// @access  Public
exports.getGalleryGrouped = asyncHandler(async (req, res, next) => {
  const galleryItems = await GalleryItem.find({ isActive: true }).sort('order');

  // Group by category
  const grouped = galleryItems.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  res.status(200).json({
    success: true,
    data: grouped
  });
});

// @desc    Get single gallery item
// @route   GET /api/gallery/:id
// @access  Public
exports.getGalleryItem = asyncHandler(async (req, res, next) => {
  const galleryItem = await GalleryItem.findById(req.params.id);

  if (!galleryItem) {
    return res.status(404).json({
      success: false,
      message: 'Gallery item not found'
    });
  }

  res.status(200).json({
    success: true,
    data: galleryItem
  });
});

// @desc    Create new gallery item
// @route   POST /api/gallery
// @access  Private/Admin
exports.createGalleryItem = asyncHandler(async (req, res, next) => {
  const galleryItem = await GalleryItem.create(req.body);

  res.status(201).json({
    success: true,
    data: galleryItem
  });
});

// @desc    Update gallery item
// @route   PUT /api/gallery/:id
// @access  Private/Admin
exports.updateGalleryItem = asyncHandler(async (req, res, next) => {
  let galleryItem = await GalleryItem.findById(req.params.id);

  if (!galleryItem) {
    return res.status(404).json({
      success: false,
      message: 'Gallery item not found'
    });
  }

  galleryItem = await GalleryItem.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: galleryItem
  });
});

// @desc    Delete gallery item
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
exports.deleteGalleryItem = asyncHandler(async (req, res, next) => {
  const galleryItem = await GalleryItem.findById(req.params.id);

  if (!galleryItem) {
    return res.status(404).json({
      success: false,
      message: 'Gallery item not found'
    });
  }

  await galleryItem.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
    message: 'Gallery item deleted successfully'
  });
});
