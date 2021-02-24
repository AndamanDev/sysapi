const wisas = require('../config/wisas')

class Model {
  constructor() {}

  static find() {
    return wisas
      .select([
        'Ts_Province.prov_code',
        'Ts_Province.prov_name',
        'Ts_Province.zone_code',
        'Ts_Province.create_by',
        'Ts_Province.create_date',
        'Ts_Province.change_by',
        'Ts_Province.change_date',
        'Ts_Province.msrepl_tran_version',
      ])
      .from('Ts_Province')
  }

  static findOne(condition = {}) {
    return wisas.select('*').from('Ts_Province').where(condition).first()
  }
}

module.exports = Model
