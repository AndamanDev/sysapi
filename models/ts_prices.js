const wisas = require('../config/wisas')
const moment = require('moment')
moment.locale('th')
class Model {
  constructor() {}

  static find() {
    return wisas
      .select([
		'vFindPriAnnFix_with_Freight.*'
        //'vFindPriAnnFix_with_Freight.pyear',
        //'vFindPriAnnFix_with_Freight.period_no',
        //'vFindPriAnnFix_with_Freight.trd_code',
        //'vFindPriAnnFix_with_Freight.ret_code',
        //'vFindPriAnnFix_with_Freight.wh_number',
        //'vFindPriAnnFix_with_Freight.com_grade_code',
        //'vFindPriAnnFix_with_Freight.freight_price',
        //'vFindPriAnnFix_with_Freight.loyalty_price',
        //'vFindPriAnnFix_with_Freight.wh_price',
        //'vFindPriAnnFix_with_Freight.addition_price',
        //'vFindPriAnnFix_with_Freight.spcadj_price',
        //'vFindPriAnnFix_with_Freight.create_by',
        //'vFindPriAnnFix_with_Freight.create_date',
        //'vFindPriAnnFix_with_Freight.change_by',
        //'vFindPriAnnFix_with_Freight.change_date',
        //'vFindPriAnnFix_with_Freight.trd_name',
        //'vFindPriAnnFix_with_Freight.trd_title',
        //'vFindPriAnnFix_with_Freight.ret_title',
        //'vFindPriAnnFix_with_Freight.ret_name',
        //'vFindPriAnnFix_with_Freight.wh_name',
        //'vFindPriAnnFix_with_Freight.com_grade_name',
        //'vFindPriAnnFix_with_Freight.effdate_from',
        //'vFindPriAnnFix_with_Freight.effdate_to',
      ])
      .from('vFindPriAnnFix_with_Freight')
      .where({
        'vFindPriAnnFix_with_Freight.pyear': moment().format('YYYY')
      })
      .whereNotNull('vFindPriAnnFix_with_Freight.trd_code')
      .whereNotNull('vFindPriAnnFix_with_Freight.ret_code')
      .whereRaw(`vFindPriAnnFix_with_Freight.effdate_to >= ?`, [moment().format('YYYY-MM-DD')])
  }

  static findOne(condition = {}) {
    return wisas.select('*').from('vFindPriAnnFix_with_Freight').where(condition).first()
  }
}

module.exports = Model
