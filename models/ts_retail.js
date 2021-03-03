const wisas = require('../config/wisas')
class Model {
  constructor() {}

  static find() {
    return wisas
      .select([
        'ts_retail.ret_code',
        'ts_retail.ret_title',
        'ts_retail.ret_name',
        'ts_retail.ret_adr1',
        'ts_retail.ret_adr2',
        'ts_retail.zip_code',
        'ts_retail.prov_code',
        'ts_retail.con_p',
        'ts_retail.con_tel',
        'ts_retail.fax',
        'ts_retail.ret_email',
        'ts_retail.ret_profile',
        'ts_retail.create_by',
        'ts_retail.create_date',
        'ts_retail.change_by',
        'ts_retail.change_date',
        'ts_retail.msrepl_tran_version',
        'ts_retail.RetailGroupID',
      ])
      .from('ts_retail')
  }

  static findOne(condition = {}) {
    return wisas.select('*').from('ts_retail').where(condition).first()
  }
}

module.exports = Model
