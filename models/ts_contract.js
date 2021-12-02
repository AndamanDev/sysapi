const wisas = require('../config/wisas')
const moment = require('moment')
moment.locale('th')
class Model {
  constructor() {}

  static find() {
    return wisas
      .select([
		'vRptContractPrice.*'
        //'vRptContractPrice.pyear',
        //'vRptContractPrice.trd_code',
        //'vRptContractPrice.contract_no',
        //'vRptContractPrice.contract_price',
        //'vRptContractPrice.loyalty_price',
        //'vRptContractPrice.wh_price',
        //'vRptContractPrice.addition_price',
        //'vRptContractPrice.sup_code_freight',
        //'vRptContractPrice.sup_title_freight',
        //'vRptContractPrice.sup_name_freight',
        //'vRptContractPrice.freight_price',
        //'vRptContractPrice.sup_code_cut',
        //'vRptContractPrice.sup_title_cut',
        //'vRptContractPrice.sup_title_name',
        //'vRptContractPrice.cut_price',
        //'vRptContractPrice.ret_code',
        //'vRptContractPrice.wh_number',
        //'vRptContractPrice.ret_title',
        //'vRptContractPrice.ret_name',
        //'vRptContractPrice.wh_name',
        //'vRptContractPrice.rev_no',
        //'vRptContractPrice.tot_estwgt',
        //'vRptContractPrice.tot_wgtlimit',
        //'vRptContractPrice.gain_qb',
        //'vRptContractPrice.effdate_from',
        //'vRptContractPrice.effdate_to',
        //'vRptContractPrice.ver_by',
        //'vRptContractPrice.ver_date',
        //'vRptContractPrice.apprv_by',
        //'vRptContractPrice.apprv_date',
        //'vRptContractPrice.create_by',
        //'vRptContractPrice.create_date',
        //'vRptContractPrice.com_grade_name',
        //'vRptContractPrice.est_wgt',
        //'vRptContractPrice.trd_title',
        //'vRptContractPrice.trd_name',
        //'vRptContractPrice.state_scrap',
        //'vRptContractPrice.pay',
        //'vRptContractPrice.reference',
      ])
      .from('vRptContractPrice')
      .where({
        'vRptContractPrice.status': 'A',
        'vRptContractPrice.pyear': moment().format('YYYY'),
      })
      .whereNotNull('vRptContractPrice.trd_code')
      .whereNotNull('vRptContractPrice.ret_code')
      .whereRaw('vRptContractPrice.effdate_to >= ?', [moment().format('YYYY-MM-DD')])
      .whereRaw('IFNULL(vRptContractPrice.tot_actwgt, 0) < IFNULL(vRptContractPrice.tot_estwgt, 0)')
  }

  static findOne(condition = {}) {
    return wisas.select('*').from('vRptContractPrice').where(condition).first()
  }
}

module.exports = Model
