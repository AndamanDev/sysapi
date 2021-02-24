const wisas = require('../config/Yamatocarinout')

class Model {
  constructor() {}

  static find() {
    return wisas.select(['BL_Names.Name', 'BL_Names.SurName']).from('BL_Names')
  }

  static findOne(condition = {}) {
    return wisas.select('*').from('BL_Names').where(condition).first()
  }
}

module.exports = Model
