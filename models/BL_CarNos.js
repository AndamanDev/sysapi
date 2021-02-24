const wisas = require('../config/Yamatocarinout')

class Model {
  constructor() {}

  static find() {
    return wisas.select(['BL_CarNos.CarNo', 'BL_CarNos.Prov_Name', 'BL_CarNos.Prov_Code']).from('BL_CarNos')
    // .orderBy('BL_CarNos.CarNo', 'asc')
    // .groupBy('BL_CarNos.CarNo')
  }

  static findOne(condition = {}) {
    return wisas.select('*').from('BL_CarNos').where(condition).first()
  }

  static count() {
    return wisas('BL_CarNos').count('*', { as: 'total' })
  }
}

module.exports = Model
