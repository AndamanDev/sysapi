const { CRRegTrucks, CRRegTrucksQuerier } = require('../../models')
const trimValue = require('../../utils/trim-value')

/**
 * GET All
 *
 * @param {*} req
 * @param {*} res
 */
exports.getCRRegTrucksList = async (req, res) => {
  try {
    const querier = new CRRegTrucksQuerier(req.query, CRRegTrucks.find())
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
exports.getCRRegTrucks = async (req, res) => {
  try {
    req.assert(req.query.CarNo, 400, 'invalid CarNo.')

    const response = await CRRegTrucks.findOne(req.query)
    res.success(trimValue(response))
  } catch (err) {
    res.error(err)
  }
}
