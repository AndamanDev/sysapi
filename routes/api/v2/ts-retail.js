const router = require('express').Router()
const {
  getTsRetailList,
  getTsRetail,
} = require('../../../controllers/v2/ts-retail')
const { protect } = require('../../../middleware/auth')

router.get('/list', protect, getTsRetailList)

router.get('/item', protect, getTsRetail)

module.exports = router
