const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const knex = require('../config/db')
const bcrypt = require('bcryptjs')

// @desc      Get all users
// @route     GET /api/v1/auth/users
// @access    Private/Admin
// exports.getUsers = asyncHandler(async (req, res, next) => {
//   res.status(200).json(res.advancedResults);
// });

// @desc      Get single user
// @route     GET /api/v1/auth/users/:id
// @access    Private/Admin
// exports.getUser = asyncHandler(async (req, res, next) => {
//   const user = await User.findById(req.params.id);

//   res.status(200).json({
//     success: true,
//     data: user
//   });
// });

// @desc      Create user
// @route     POST /api/v1/auth/users
// @access    Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const salt = await bcrypt.genSalt(12)
  const password = await bcrypt.hash(req.body.password, salt)
  const user = await knex('user').insert({
    username: 'admin',
    email: 'codelaravel@gmail.com',
    password_hash: password,
    // confirmed_at: '',
    // unconfirmed_email: '',
    // blocked_at: '',
    // registration_ip: '',
    created_at: Math.round(new Date() / 1000),
    // updated_at: '',
    // last_login_at: '',
    // access_token_expired_at: '',
    // access_token: '',
    user_type_id: 0,
  })

  res.status(201).json({
    success: true,
    data: user[0],
  })
})

// @desc      Update user
// @route     PUT /api/v1/auth/users/:id
// @access    Private/Admin
// exports.updateUser = asyncHandler(async (req, res, next) => {
//   const user = await User.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true
//   });

//   res.status(200).json({
//     success: true,
//     data: user
//   });
// });

// @desc      Delete user
// @route     DELETE /api/v1/auth/users/:id
// @access    Private/Admin
// exports.deleteUser = asyncHandler(async (req, res, next) => {
//   await User.findByIdAndDelete(req.params.id);

//   res.status(200).json({
//     success: true,
//     data: {}
//   });
// });
