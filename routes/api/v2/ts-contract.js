const router = require('express').Router()
const {
  getTsContractList,
  getTsContract,
} = require('../../../controllers/v2/ts-contract')
const { protect } = require('../../../middleware/auth')

router.get('/list', protect, getTsContractList)

router.get('/item', protect, getTsContract)

module.exports = router
