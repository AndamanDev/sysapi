const wisas = require('../config/wisas')
class Model {
  constructor() {}

  static find() {
    return wisas
      .select([
        'ts_trucktype.truck_type',
        'ts_trucktype.truck_name',
        'ts_trucktype.base_low_wgt',
        'ts_trucktype.tolerance',
        'ts_trucktype.max_diff_wgt',
        'ts_trucktype.tol_trans',
        'ts_trucktype.tol_time',
        'ts_trucktype.create_by',
        'ts_trucktype.create_date',
        'ts_trucktype.change_by',
        'ts_trucktype.change_date',
        'ts_trucktype.msrepl_tran_version',
      ])
      .from('ts_trucktype')
  }

  static findOne(condition = {}) {
    return wisas.select('*').from('ts_trucktype').where(condition).first()
  }
}

module.exports = Model
