const router = require('express').Router()
const {
  getCRRegTrucksList,
  getCRRegTrucks,
} = require('../../../controllers/v2/cr-reg-trucks')
const { protect } = require('../../../middleware/auth')

router.get('/list', protect, getCRRegTrucksList)

router.get('/item', protect, getCRRegTrucks)

module.exports = router
