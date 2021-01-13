const express = require('express')
const { getAll } = require('../controllers/ts_trader')

const router = express.Router()

const { protect } = require('../middleware/auth')

router.get('/all', protect, getAll)
module.exports = router
