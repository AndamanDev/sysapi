const { TsTrader, TsTraderQuerier } = require('../../models')
const trimValue = require('../../utils/trim-value')

/**
 * GET All
 *
 * @param {*} req
 * @param {*} res
 */
exports.getTsTraderList = async (req, res) => {
  try {
    const querier = new TsTraderQuerier(req.query, TsTrader.find())
    const response = await querier.run()
    res.success(trimValue(response))
  } catch (err) {
    res.error(err)
  }
}

/**
 * GET Frist Item
 *
 * @param {*} req
 * @param {*} res
 */
exports.getTsTrader = async (req, res) => {
  try {
    req.assert(req.query.trd_code, 400, 'invalid trd_code.')

    const response = await TsTrader.findOne(req.query)
    res.success(trimValue(response))
  } catch (err) {
    res.error(err)
  }
}
