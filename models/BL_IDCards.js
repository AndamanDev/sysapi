const wisas = require('../config/Yamatocarinout')

class Model {
  constructor() {}

  static find() {
    return wisas.select('BL_IDCards.IDCard').from('BL_IDCards')
  }

  static findOne(condition = {}) {
    return wisas.select('*').from('BL_IDCards').where(condition).first()
  }
}

module.exports = Model
