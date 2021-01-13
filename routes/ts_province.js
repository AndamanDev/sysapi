const express = require('express')
const { getAll } = require('../controllers/ts_province') //table vFindPriAnnFix_with_Freight

const router = express.Router()

const { protect } = require('../middleware/auth')

router.get('/all', protect, getAll)
module.exports = router
