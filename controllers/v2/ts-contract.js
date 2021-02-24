const { TsContract, TsContractQuerier } = require('../../models')
const trimValue = require('../../utils/trim-value')

/**
 * GET All
 *
 * @param {*} req
 * @param {*} res
 */
exports.getTsContractList = async (req, res) => {
  try {
    const querier = new TsContractQuerier(req.query, TsContract.find())
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
exports.getTsContract = async (req, res) => {
  try {
    req.assert(req.query.trd_code, 400, 'invalid trd_code.')
    req.assert(req.query.ret_code, 400, 'invalid ret_code.')

    const response = await TsContract.findOne(req.query)
    res.success(trimValue(response))
  } catch (err) {
    res.error(err)
  }
}
