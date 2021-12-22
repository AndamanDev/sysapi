const wisas = require('../config/wisas2')
class Model {
  constructor() {}

  static find() {
    return wisas
      .select([
        'vCom_grade_code.*',
      ])
      .from('vCom_grade_code')
  }

  static findOne(condition = {}) {
    return wisas.select('*').from('vCom_grade_code').where(condition).first()
  }
}

module.exports = Model