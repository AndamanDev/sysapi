const express = require('express')
const {
  register,
  login,
  logout,
  getMe,
  getPull,
  postInstall,
  // forgotPassword,
  // resetPassword,
  // updateDetails,
  // updatePassword
} = require('../controllers/auth')

const router = express.Router()

const { protect } = require('../middleware/auth')

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/me', protect, getMe)
router.get('/pull', protect, getPull)
router.post('/install', protect, postInstall)
// router.put('/updatedetails', protect, updateDetails)
// router.put('/updatepassword', protect, updatePassword)
// router.post('/forgotpassword', forgotPassword)
// router.put('/resetpassword/:resettoken', resetPassword)

module.exports = router
