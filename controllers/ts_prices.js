const ErrorResponse = require('../utils/errorResponse')
const wisas = require('../config/wisas')
const asyncHandler = require('../middleware/async')

// @desc      All ts_trader
// @route     POST /api/v1/auth/ts_trader/all
// @access    Private/Admin
exports.getAll = asyncHandler(async (req, res, next) => {
  try {
    const prices = await wisas
      .select('*')
      .from('vFindPriAnnFix_with_Freight')
      .limit(10)
    res.status(201).json({
      success: true,
      data: prices,
    })
  } catch (err) {
    next(new ErrorResponse('Error:' + err, 400))
  }
})
