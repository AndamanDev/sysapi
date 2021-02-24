const { BlNames, BlNamesQuerier } = require('../../models')
const trimValue = require('../../utils/trim-value')

/**
 * GET All
 *
 * @param {*} req
 * @param {*} res
 */
exports.getBlNamesList = async (req, res) => {
  try {
    const querier = new BlNamesQuerier(req.query, BlNames.find())
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
exports.getBlNames = async (req, res) => {
  try {
    req.assert(req.query.Name, 400, 'invalid Name.')
    req.assert(req.query.SurName, 400, 'invalid SurName.')

    const response = await BlNames.findOne(req.query)
    res.success(trimValue(response))
  } catch (err) {
    res.error(err)
  }
}
