const router = require('express').Router()
const {
  getBlCarNosList,
  getBlCarNos,
} = require('../../../controllers/v2/bl-car-nos')
const { protect } = require('../../../middleware/auth')

router.get('/list', protect, getBlCarNosList)

router.get('/item', protect, getBlCarNos)

module.exports = router
