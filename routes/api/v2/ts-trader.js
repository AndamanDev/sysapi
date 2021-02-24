const router = require('express').Router()
const {
  getTsTraderList,
  getTsTrader,
} = require('../../../controllers/v2/ts-trader')
const { protect } = require('../../../middleware/auth')

router.get('/list', protect, getTsTraderList)

router.get('/item', protect, getTsTrader)

module.exports = router
