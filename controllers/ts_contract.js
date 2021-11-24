const ErrorResponse = require('../utils/errorResponse')
const wisas = require('../config/wisas')
const asyncHandler = require('../middleware/async')
const moment = require('moment')
moment.locale('th')

// @desc      All ts_trader
// @route     POST /api/v1/auth/ts_trader/all
// @access    Private/Admin
exports.getAll = asyncHandler(async (req, res, next) => {
  try {
    const contract = await wisas
      .select('*')
      .from('vRptContractPrice')
      .where({
        status: 'A',
        pyear: moment().format('YYYY'),
      })
      .whereRaw('effdate_to >= ?', [moment().format('YYYY-MM-DD')])
      .whereRaw('tot_actwgt < tot_estwgt')
      .limit(10)
    res.status(201).json({
      success: true,
      data: contract,
    })
  } catch (err) {
    next(new ErrorResponse('Error:' + err, 400))
  }
})
