const router = require('express').Router()
const {
  getTsPricesList,
  getTsPrices,
} = require('../../../controllers/v2/ts-prices')
const { protect } = require('../../../middleware/auth')

router.get('/list', protect, getTsPricesList)

router.get('/item', protect, getTsPrices)

module.exports = router
