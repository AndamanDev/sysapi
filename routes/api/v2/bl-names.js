const router = require('express').Router()
const {
  getBlNamesList,
  getBlNames,
} = require('../../../controllers/v2/bl-names')
const { protect } = require('../../../middleware/auth')

router.get('/list', protect, getBlNamesList)

router.get('/item', protect, getBlNames)

module.exports = router
