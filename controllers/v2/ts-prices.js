const { TsPrices, TsPricesQuerier } = require('../../models')
const trimValue = require('../../utils/trim-value')
const _ = require('lodash')

/**
 * GET All
 *
 * @param {*} req
 * @param {*} res
 */
exports.getTsPricesList = async (req, res) => {
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
    const querier = new TsPricesQuerier(query, TsPrices.find())
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
