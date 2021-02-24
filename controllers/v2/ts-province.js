const { TsProvince, TsProvinceQuerier } = require('../../models')
const trimValue = require('../../utils/trim-value')

/**
 * GET All
 *
 * @param {*} req
 * @param {*} res
 */
exports.getTsProvinceList = async (req, res) => {
  try {
    const querier = new TsProvinceQuerier(req.query, TsProvince.find())
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
exports.getTsProvince = async (req, res) => {
  try {
    req.assert(req.query.prov_code, 400, 'invalid prov_code.')

    const response = await TsProvince.findOne(req.query)
    res.success(trimValue(response))
  } catch (err) {
    res.error(err)
  }
}
