const { CRRegPersons, CRRegPersonsQuerier } = require('../../models')
const trimValue = require('../../utils/trim-value')
const _ = require('lodash')

/**
 * GET All
 *
 * @param {*} req
 * @param {*} res
 */
exports.getCRRegPersonsList = async (req, res) => {
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
    const querier = new CRRegPersonsQuerier(query, CRRegPersons.find())
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
