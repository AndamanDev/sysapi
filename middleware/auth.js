const jwt = require('jsonwebtoken')
const asyncHandler = require('./async')
const ErrorResponse = require('../utils/errorResponse')
const admin = require('firebase-admin')
// const bcrypt = require('bcryptjs')
// const knex = require('../config/db')
// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1]
    // Set token from cookie
  } else if (req.cookies.token) {
    token = req.cookies.token
  }
  const firebaseToken = req.headers['x-firebase-token'] || req.headers['X-Firebase-Token']

  try {
    if (firebaseToken) {
      const decodedToken = await admin.auth().verifyIdToken(firebaseToken)
      // const userRecord = await admin.auth().getUser(decodedToken.uid)
      // const user = userRecord.toJSON()
      req.user = decodedToken
      next()
    } else if (token) {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      if (decoded) {
        next()
      }
    } // Make sure token exists
    else if (!token) {
      return next(new ErrorResponse('Not authorized to access this route', 401))
    } else {
      next()
    }
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route' + err.message, 401))
  }
})

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorResponse(`User role ${req.user.role} is not authorized to access this route`, 403))
    }
    next()
  }
}
