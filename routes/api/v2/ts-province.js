const router = require('express').Router()
const {
  getTsProvinceList,
  getTsProvince,
} = require('../../../controllers/v2/ts-province')
const { protect } = require('../../../middleware/auth')

router.get('/list', protect, getTsProvinceList)

router.get('/item', protect, getTsProvince)

module.exports = router
