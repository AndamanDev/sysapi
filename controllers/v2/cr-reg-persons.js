const { CRRegPersons, CRRegPersonsQuerier } = require('../../models')
const trimValue = require('../../utils/trim-value')

/**
 * GET All
 *
 * @param {*} req
 * @param {*} res
 */
exports.getCRRegPersonsList = async (req, res) => {
  try {
    const querier = new CRRegPersonsQuerier(req.query, CRRegPersons.find())
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
exports.getCRRegPersons = async (req, res) => {
  try {
    req.assert(req.query.ID, 400, 'invalid ID.')

    const response = await CRRegPersons.findOne(req.query)
    res.success(trimValue(response))
  } catch (err) {
    res.error(err)
  }
}
