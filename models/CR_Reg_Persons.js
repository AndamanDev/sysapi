const wisas = require('../config/Yamatocarinout')

class Model {
  constructor() {}

  static find() {
    return wisas
      .select([
        'CR_Reg_Persons.AutoID',
        'CR_Reg_Persons.Title',
        'CR_Reg_Persons.Name',
        'CR_Reg_Persons.SurName',
        'CR_Reg_Persons.ID',
        'CR_Reg_Persons.UserCreate',
        'CR_Reg_Persons.CreateDt',
        'CR_Reg_Persons.UserUpdate',
        'CR_Reg_Persons.UpdateDt',
        'CR_Reg_Persons.Description',
      ])
      .from('CR_Reg_Persons')
  }

  static findOne(condition = {}) {
    return wisas.select('*').from('CR_Reg_Persons').where(condition).first()
  }
}

module.exports = Model
