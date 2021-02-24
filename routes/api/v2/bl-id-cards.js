const router = require('express').Router()
const {
  getBlIDCardsList,
  getBlIDCards,
} = require('../../../controllers/v2/bl-id-cards')
const { protect } = require('../../../middleware/auth')

router.get('/list', protect, getBlIDCardsList)

router.get('/item', protect, getBlIDCards)

module.exports = router
