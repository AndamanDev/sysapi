const router = require('express').Router()
const {
  getCRRegPersonsList,
  getCRRegPersons,
} = require('../../../controllers/v2/cr-reg-persons')
const { protect } = require('../../../middleware/auth')

router.get('/list', protect, getCRRegPersonsList)

router.get('/item', protect, getCRRegPersons)

module.exports = router
