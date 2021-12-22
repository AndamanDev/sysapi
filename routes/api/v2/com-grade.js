const router = require('express').Router()
const {
  getComGradeList,
  getComGrade,
} = require('../../../controllers/v2/com-grade')
const { protect } = require('../../../middleware/auth')

router.get('/list', protect, getComGradeList)

router.get('/item', protect, getComGrade)

module.exports = router