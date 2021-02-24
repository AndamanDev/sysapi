const BaseQuerier = require('./base-querier')
const operators = require('./operators')
const _ = require('lodash')

class Querier extends BaseQuerier {
  defineSchema(schema) {
    // filtering
    schema.filter('q', '=')
    schema.filter('prov_code', operators, { field: 'Ts_Province.prov_code' })
    schema.filter('prov_name', operators, { field: 'Ts_Province.prov_name' })
    schema.filter('zone_code', operators, { field: 'Ts_Province.zone_code' })
    schema.filter('create_by', operators, { field: 'Ts_Province.create_by' })
    schema.filter('create_date', operators, {
      field: 'Ts_Province.create_date',
    })
    schema.filter('change_by', operators, { field: 'Ts_Province.change_by' })
    schema.filter('change_date', operators, {
      field: 'Ts_Province.change_date',
    })
    schema.filter('msrepl_tran_version', operators, {
      field: 'Ts_Province.msrepl_tran_version',
    })

    // sorting
    schema.sort('prov_code', { field: 'Ts_Province.prov_code' })
    schema.sort('prov_name', { field: 'Ts_Province.prov_name' })
    schema.sort('zone_code', { field: 'Ts_Province.zone_code' })
    schema.sort('create_by', { field: 'Ts_Province.create_by' })
    schema.sort('create_date', { field: 'Ts_Province.create_date' })
    schema.sort('change_by', { field: 'Ts_Province.change_by' })
    schema.sort('change_date', { field: 'Ts_Province.change_date' })
    schema.sort('msrepl_tran_version', {
      field: 'Ts_Province.msrepl_tran_version',
    })
    schema.page(!!this.query.page)
  }

  'filter:q[=]'(builder, { value }) {
    value = `%${value}%`
    return builder.where(function () {
      this.orWhere('Ts_Province.prov_code', 'like', value)
        .orWhere('Ts_Province.prov_name', 'like', value)
        .orWhere('Ts_Province.zone_code', 'like', value)
        .orWhere('Ts_Province.create_by', 'like', value)
        .orWhere('Ts_Province.create_date', 'like', value)
        .orWhere('Ts_Province.change_by', 'like', value)
        .orWhere('Ts_Province.change_date', 'like', value)
        .orWhere('Ts_Province.msrepl_tran_version', 'like', value)
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
      builder.orderBy('Ts_Province.prov_code', 'asc')
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
