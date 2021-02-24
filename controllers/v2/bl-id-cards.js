const { BlIDCards, BlIDCardsQuerier } = require('../../models')
const trimValue = require('../../utils/trim-value')

/**
 * GET All
 *
 * @param {*} req
 * @param {*} res
 */
exports.getBlIDCardsList = async (req, res) => {
  try {
    const querier = new BlIDCardsQuerier(req.query, BlIDCards.find())
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
exports.getBlIDCards = async (req, res) => {
  try {
    req.assert(req.query.IDCard, 400, 'invalid IDCard.')

    const response = await BlIDCards.findOne(req.query)
    res.success(trimValue(response))
  } catch (err) {
    res.error(err)
  }
}
