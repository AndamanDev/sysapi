const ErrorResponse = require('../utils/errorResponse')
const wisas = require('../config/wisas')
const asyncHandler = require('../middleware/async')
const QueryQL = require('@truepic/queryql')

// @desc      All ts_trader
// @route     POST /api/v1/auth/ts_trader/all
// @access    Private/Admin
exports.getAll = asyncHandler(async (req, res, next) => {
  try {
    const ts_trucktype = await wisas.select('*').from('ts_trucktype').limit(10)
    res.status(201).json({
      success: true,
      data: ts_trucktype,
      QueryQL: QueryQL.adapters,
    })
  } catch (err) {
    next(new ErrorResponse('Error:' + err, 400))
  }
})
