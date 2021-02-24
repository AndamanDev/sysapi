const { TsPrices, TsPricesQuerier } = require('../../models')
const trimValue = require('../../utils/trim-value')

/**
 * GET All
 *
 * @param {*} req
 * @param {*} res
 */
exports.getTsPricesList = async (req, res) => {
  try {
    const querier = new TsPricesQuerier(req.query, TsPrices.find())
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
exports.getTsPrices = async (req, res) => {
  try {
    req.assert(req.query.trd_code, 400, 'invalid trd_code.')
    req.assert(req.query.ret_code, 400, 'invalid ret_code.')

    const response = await TsPrices.findOne(req.query)
    res.success(trimValue(response))
  } catch (err) {
    res.error(err)
  }
}
