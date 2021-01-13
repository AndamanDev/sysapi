const ErrorResponse = require('../utils/errorResponse')
const wisas = require('../config/Yamatocarinout')
const asyncHandler = require('../middleware/async')

// @desc      All ts_trader
// @route     POST /api/v1/auth/ts_trader/all
// @access    Private/Admin
exports.getAll = asyncHandler(async (req, res, next) => {
  try {
    const BL_CarNos = await wisas.select('*').from('BL_CarNos').limit(10)
    res.status(201).json({
      success: true,
      data: BL_CarNos,
    })
  } catch (err) {
    next(new ErrorResponse('Error:' + err, 400))
  }
})
