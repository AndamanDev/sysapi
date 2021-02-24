const wisas = require('../config/wisas')

class Model {
  constructor() {}

  static find() {
    return wisas
      .select([
        'ts_trader.trd_code',
        'ts_trader.trd_title',
        'ts_trader.trd_name',
        'ts_trader.trd_adr1',
        'ts_trader.trd_adr2',
        'ts_trader.trdsap_code',
        'ts_trader.prov_code',
        'ts_trader.zip_code',
        'ts_trader.cn_p1',
        'ts_trader.cn_p1_tel',
        'ts_trader.cn_p2',
        'ts_trader.cn_p2_tel',
        'ts_trader.cn_p3',
        'ts_trader.cn_p3_tel',
        'ts_trader.fax1',
        'ts_trader.fax2',
        'ts_trader.trd_email',
        'ts_trader.trd_class',
        'ts_trader.eval_grade',
        'ts_trader.trd_profile',
        'ts_trader.create_by',
        'ts_trader.create_date',
        'ts_trader.change_by',
        'ts_trader.change_date',
        'ts_trader.msrepl_tran_version',
      ])
      .from('ts_trader')
  }

  static findOne(condition = {}) {
    return wisas.select('*').from('ts_trader').where(condition).first()
  }
}

module.exports = Model
