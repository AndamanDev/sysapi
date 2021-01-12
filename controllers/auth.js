const crypto = require('crypto')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
// const sendEmail = require('../utils/sendEmail')
const bcrypt = require('bcryptjs')
const knex = require('../config/db')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({ path: '../config/config.env' })

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  // Create user
  const salt = await bcrypt.genSalt(12)
  const password_hash = await bcrypt.hash(req.body.password, salt)
  const user = await knex('user').insert({
    username: req.body.username,
    email: req.body.email,
    password_hash: password_hash,
    // confirmed_at: '',
    // unconfirmed_email: '',
    // blocked_at: '',
    // registration_ip: '',
    created_at: Math.round(new Date() / 1000),
    // updated_at: '',
    // last_login_at: '',
    access_token_expired_at: Math.round(
      (Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000) / 1000
    ),
    access_token: getSignedJwtToken(),
    user_type_id: 0,
  })
  sendTokenResponse(user, 200, res)
})

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  // console.log(req.body.email)
  // Validate email & password
  if (!req.body.email || !req.body.password) {
    return next(new ErrorResponse('Please provide an email and password', 400))
  }
  // Check for user
  // const user = await User.findOne({ email }).select('+password')
  const user = knex.select('email', 'password').from('user')
  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401))
  }
  // Check if password matches
  const isMatch = await matchPassword(req.body.password, req.body.email)
  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401))
  }
  sendTokenResponse(user, 200, res)
})

// // @desc      Log user out / clear cookie
// // @route     GET /api/v1/auth/logout
// // @access    Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  })

  res.status(200).json({
    success: true,
    data: {},
  })
})

// @desc      Get current logged in user
// @route     POST /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  if (!req.body.id) {
    return next(new ErrorResponse('กรุณาใส่ id ที่จะค้นหาด้วยครับ', 400))
  } else {
    const user = await knex('user').where({ id: req.body.id }).select()
    res.status(200).json({
      success: true,
      data: user,
    })
  }
})

exports.getPull = asyncHandler(async (req, res, next) => {
  const { exec } = require('child_process')
  exec('git pull', (err, stdout, stderr) => {
    console.log('error :', err)
    console.log('stdout:', stdout)
    console.log('stderr:', stderr)
  })
})

// // @desc      Update user details
// // @route     PUT /api/v1/auth/updatedetails
// // @access    Private
// exports.updateDetails = asyncHandler(async (req, res, next) => {
//   const fieldsToUpdate = {
//     name: req.body.name,
//     email: req.body.email,
//   }

//   const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
//     new: true,
//     runValidators: true,
//   })

//   res.status(200).json({
//     success: true,
//     data: user,
//   })
// })

// // @desc      Update password
// // @route     PUT /api/v1/auth/updatepassword
// // @access    Private
// exports.updatePassword = asyncHandler(async (req, res, next) => {
//   const user = await User.findById(req.user.id).select('+password')

//   // Check current password
//   if (!(await user.matchPassword(req.body.currentPassword))) {
//     return next(new ErrorResponse('Password is incorrect', 401))
//   }

//   user.password = req.body.newPassword
//   await user.save()

//   sendTokenResponse(user, 200, res)
// })

// // @desc      Forgot password
// // @route     POST /api/v1/auth/forgotpassword
// // @access    Public
// exports.forgotPassword = asyncHandler(async (req, res, next) => {
//   const user = await User.findOne({ email: req.body.email })

//   if (!user) {
//     return next(new ErrorResponse('There is no user with that email', 404))
//   }

//   // Get reset token
//   const resetToken = user.getResetPasswordToken()

//   await user.save({ validateBeforeSave: false })

//   // Create reset url
//   const resetUrl = `${req.protocol}://${req.get(
//     'host'
//   )}/api/v1/auth/resetpassword/${resetToken}`

//   const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`

//   try {
//     await sendEmail({
//       email: user.email,
//       subject: 'Password reset token',
//       message,
//     })

//     res.status(200).json({ success: true, data: 'Email sent' })
//   } catch (err) {
//     console.log(err)
//     user.resetPasswordToken = undefined
//     user.resetPasswordExpire = undefined

//     await user.save({ validateBeforeSave: false })

//     return next(new ErrorResponse('Email could not be sent', 500))
//   }

//   res.status(200).json({
//     success: true,
//     data: user,
//   })
// })

// // @desc      Reset password
// // @route     PUT /api/v1/auth/resetpassword/:resettoken
// // @access    Public
// exports.resetPassword = asyncHandler(async (req, res, next) => {
//   // Get hashed token
//   const resetPasswordToken = crypto
//     .createHash('sha256')
//     .update(req.params.resettoken)
//     .digest('hex')

//   const user = await User.findOne({
//     resetPasswordToken,
//     resetPasswordExpire: { $gt: Date.now() },
//   })

//   if (!user) {
//     return next(new ErrorResponse('Invalid token', 400))
//   }

//   // Set new password
//   user.password = req.body.password
//   user.resetPasswordToken = undefined
//   user.resetPasswordExpire = undefined
//   await user.save()

//   sendTokenResponse(user, 200, res)
// })

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = getSignedJwtToken()

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  }

  if (process.env.NODE_ENV === 'production') {
    options.secure = true
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  })
}

const getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

const matchPassword = async function (enteredPassword, enterEmail) {
  // console.log(enteredPassword)
  // console.log(enterEmail)
  const user = await knex('user')
    .where({ email: enterEmail })
    .select('password_hash')
  return await bcrypt.compare(enteredPassword, user[0].password_hash)
}
