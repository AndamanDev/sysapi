const { BlIDCards, BlIDCardsQuerier } = require('../../models')
const trimValue = require('../../utils/trim-value')
const _ = require('lodash')

/**
 * GET All
 *
 * @param {*} req
 * @param {*} res
 */
exports.getBlIDCardsList = async (req, res) => {
  try {
    let query = req.query
    const perPage = parseInt(_.get(query, 'page.size', 50))
    const currentPage = parseInt(_.get(query, 'page.number', 1))
    if (perPage === -1) {
      query = _.omit(query, ['page'])
    } else {
      query = Object.assign(query, {
        size: perPage,
        number: currentPage,
      })
    }
    const querier = new BlIDCardsQuerier(query, BlIDCards.find())
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
