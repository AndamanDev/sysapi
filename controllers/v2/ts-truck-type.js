const { TsTrucktype, TsTrucktypeQuerier } = require('../../models')
const trimValue = require('../../utils/trim-value')

/**
 * GET All
 *
 * @param {*} req
 * @param {*} res
 */
exports.getTsTrucktypeList = async (req, res) => {
  try {
    const querier = new TsTrucktypeQuerier(req.query, TsTrucktype.find())
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
exports.getTsTrucktype = async (req, res) => {
  try {
    req.assert(req.query.truck_type, 400, 'invalid truck_type.')

    const response = await TsTrucktype.findOne(req.query)
    res.success(trimValue(response))
  } catch (err) {
    res.error(err)
  }
}
