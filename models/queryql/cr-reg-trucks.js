const BaseQuerier = require('./base-querier')
const operators = require('./operators')
const _ = require('lodash')

class Querier extends BaseQuerier {
  defineSchema(schema) {
    // filtering
    schema.filter('q', '=')
    schema.filter('AutoID', operators, { field: 'CR_Reg_Trucks.AutoID' })
    schema.filter('HeadFlag', operators, { field: 'CR_Reg_Trucks.HeadFlag' })
    schema.filter('CarNo', operators, { field: 'CR_Reg_Trucks.CarNo' })
    schema.filter('CarProvince', operators, {
      field: 'CR_Reg_Trucks.CarProvince',
    })
    schema.filter('UserCreate', operators, {
      field: 'CR_Reg_Trucks.UserCreate',
    })
    schema.filter('CreateDt', operators, { field: 'CR_Reg_Trucks.CreateDt' })
    schema.filter('UserUpdate', operators, {
      field: 'CR_Reg_Trucks.UserUpdate',
    })
    schema.filter('UpdateDt', operators, { field: 'CR_Reg_Trucks.UpdateDt' })
    schema.filter('Description', operators, {
      field: 'CR_Reg_Trucks.Description',
    })

    // sorting
    schema.sort('AutoID', { field: 'CR_Reg_Trucks.AutoID' })
    schema.sort('HeadFlag', { field: 'CR_Reg_Trucks.HeadFlag' })
    schema.sort('CarNo', { field: 'CR_Reg_Trucks.CarNo' })
    schema.sort('CarProvince', { field: 'CR_Reg_Trucks.CarProvince' })
    schema.sort('UserCreate', { field: 'CR_Reg_Trucks.UserCreate' })
    schema.sort('CreateDt', { field: 'CR_Reg_Trucks.CreateDt' })
    schema.sort('UserUpdate', { field: 'CR_Reg_Trucks.UserUpdate' })
    schema.sort('UpdateDt', { field: 'CR_Reg_Trucks.UpdateDt' })
    schema.sort('Description', { field: 'CR_Reg_Trucks.Description' })
    schema.page(!!this.query.page)
  }

  'filter:q[=]'(builder, { value }) {
    value = `%${value}%`
    return builder.where(function () {
      this.orWhere('CR_Reg_Trucks.AutoID', 'like', value)
        .orWhere('CR_Reg_Trucks.HeadFlag', 'like', value)
        .orWhere('CR_Reg_Trucks.CarNo', 'like', value)
        .orWhere('CR_Reg_Trucks.CarProvince', 'like', value)
        .orWhere('CR_Reg_Trucks.UserCreate', 'like', value)
        .orWhere('CR_Reg_Trucks.CreateDt', 'like', value)
        .orWhere('CR_Reg_Trucks.UserUpdate', 'like', value)
        .orWhere('CR_Reg_Trucks.UpdateDt', 'like', value)
        .orWhere('CR_Reg_Trucks.Description', 'like', value)
    })
  }

  async run() {
    super.run()

    let builder = this.builder
    let clone = builder.clone()
    clone._single = _.omit(clone._single, ['limit', 'offset'])
    // check get all rows
    if (_.get(this.query, 'page.size', 10) === -1) {
      builder = _.omit(builder, ['limit', 'offset'])
    }
    // chack current page
    if (_.get(this.query, 'page.number')) {
      builder.orderBy('CR_Reg_Trucks.AutoID', 'asc')
    }

    const page = _.get(this.query, 'page')
    const currentPage = parseInt(_.get(page, 'number', 1))
    const perPage = parseInt(_.get(page, 'size', this.pageDefaults.size))
    const offset = (currentPage - 1) * perPage

    const query = clone.toSQL()
    if (query.bindings) {
      for (let bind of query.bindings) {
        if (bind && typeof bind === 'number') {
          bind = parseInt(bind)
        } else {
          bind = `'${bind}'`
        }
        query.sql = String(query.sql).replace('?', bind)
      }
    }
    let sql = query.sql.replace(/.*from/, 'select TOP 1 COUNT(*) as total from')

    const total = await clone.client.raw(sql) // await clone.count('*', { as: 'totalCount' }).first()
    let count = 0
    if (total) {
      count = _.get(total, '[0].total', 0)
    }
    const totalCount = parseInt(count, 10)
    const pageCount = Math.ceil(totalCount / perPage)
    const rows = await builder

    return {
      total: totalCount,
      perPage: perPage,
      offset: offset,
      to: offset + rows.length,
      lastPage: Math.ceil(count / perPage),
      currentPage: currentPage,
      pageCount: pageCount,
      from: offset,
      data: rows,
    }
  }
}

module.exports = Querier
