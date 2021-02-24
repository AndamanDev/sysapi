const { BlCarNos, BlCarNosQuerier } = require('../../models')
const trimValue = require('../../utils/trim-value')

/**
 * GET All
 *
 * @param {*} req
 * @param {*} res
 */
exports.getBlCarNosList = async (req, res) => {
  try {
    const querier = new BlCarNosQuerier(req.query, BlCarNos.find())
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
exports.getBlCarNos = async (req, res) => {
  try {
    req.assert(req.query.CarNo, 400, 'invalid CarNo.')
    req.assert(req.query.Prov_Code, 400, 'invalid Prov_Code.')

    const response = await BlCarNos.findOne(req.query)
    res.success(trimValue(response))
  } catch (err) {
    res.error(err)
  }
}
