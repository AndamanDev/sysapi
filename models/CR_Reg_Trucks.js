const wisas = require('../config/Yamatocarinout')

class Model {
  constructor() {}

  static find() {
    return wisas
      .select([
        'CR_Reg_Trucks.AutoID',
        'CR_Reg_Trucks.HeadFlag',
        'CR_Reg_Trucks.CarNo',
        'CR_Reg_Trucks.CarProvince',
        'CR_Reg_Trucks.UserCreate',
        'CR_Reg_Trucks.CreateDt',
        'CR_Reg_Trucks.UserUpdate',
        'CR_Reg_Trucks.UpdateDt',
        'CR_Reg_Trucks.Description',
      ])
      .from('CR_Reg_Trucks')
  }

  static findOne(condition = {}) {
    return wisas.select('*').from('CR_Reg_Trucks').where(condition).first()
  }
}

module.exports = Model
