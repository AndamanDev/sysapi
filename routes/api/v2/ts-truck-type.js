const router = require('express').Router()
const {
  getTsTrucktypeList,
  getTsTrucktype,
} = require('../../../controllers/v2/ts-truck-type')
const { protect } = require('../../../middleware/auth')

router.get('/list', protect, getTsTrucktypeList)

router.get('/item', protect, getTsTrucktype)

module.exports = router
