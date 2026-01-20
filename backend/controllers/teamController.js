const TeamMember = require('../models/TeamMember');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get all team members
// @route   GET /api/team
// @access  Public
exports.getTeamMembers = asyncHandler(async (req, res, next) => {
  const { active } = req.query;
  
  let query = {};
  
  if (active === 'true') {
    query.isActive = true;
  }

  const teamMembers = await TeamMember.find(query).sort('order');

  res.status(200).json({
    success: true,
    count: teamMembers.length,
    data: teamMembers
  });
});

// @desc    Get single team member
// @route   GET /api/team/:id
// @access  Public
exports.getTeamMember = asyncHandler(async (req, res, next) => {
  const teamMember = await TeamMember.findById(req.params.id);

  if (!teamMember) {
    return res.status(404).json({
      success: false,
      message: 'Team member not found'
    });
  }

  res.status(200).json({
    success: true,
    data: teamMember
  });
});

// @desc    Create new team member
// @route   POST /api/team
// @access  Private/Admin
exports.createTeamMember = asyncHandler(async (req, res, next) => {
  const teamMember = await TeamMember.create(req.body);

  res.status(201).json({
    success: true,
    data: teamMember
  });
});

// @desc    Update team member
// @route   PUT /api/team/:id
// @access  Private/Admin
exports.updateTeamMember = asyncHandler(async (req, res, next) => {
  let teamMember = await TeamMember.findById(req.params.id);

  if (!teamMember) {
    return res.status(404).json({
      success: false,
      message: 'Team member not found'
    });
  }

  teamMember = await TeamMember.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: teamMember
  });
});

// @desc    Delete team member
// @route   DELETE /api/team/:id
// @access  Private/Admin
exports.deleteTeamMember = asyncHandler(async (req, res, next) => {
  const teamMember = await TeamMember.findById(req.params.id);

  if (!teamMember) {
    return res.status(404).json({
      success: false,
      message: 'Team member not found'
    });
  }

  await teamMember.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
    message: 'Team member deleted successfully'
  });
});
