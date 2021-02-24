const { TsRetail, TsRetailQuerier } = require('../../models')
const trimValue = require('../../utils/trim-value')

/**
 * GET All
 *
 * @param {*} req
 * @param {*} res
 */
exports.getTsRetailList = async (req, res) => {
  try {
    const querier = new TsRetailQuerier(req.query, TsRetail.find())
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
exports.getTsRetail = async (req, res) => {
  try {
    req.assert(req.query.ret_code, 400, 'invalid ret_code.')

    const response = await TsRetail.findOne(req.query)
    res.success(trimValue(response))
  } catch (err) {
    res.error(err)
  }
}
