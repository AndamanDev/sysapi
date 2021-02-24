const BaseQuerier = require('./base-querier')
const operators = require('./operators')
const _ = require('lodash')

class Querier extends BaseQuerier {
  defineSchema(schema) {
    // filtering
    schema.filter('q', '=')
    schema.filter('truck_type', operators, { field: 'ts_trucktype.truck_type' })
    schema.filter('truck_name', operators, { field: 'ts_trucktype.truck_name' })
    schema.filter('base_low_wgt', operators, {
      field: 'ts_trucktype.base_low_wgt',
    })
    schema.filter('tolerance', operators, { field: 'ts_trucktype.tolerance' })
    schema.filter('max_diff_wgt', operators, {
      field: 'ts_trucktype.max_diff_wgt',
    })
    schema.filter('tol_trans', operators, { field: 'ts_trucktype.tol_trans' })
    schema.filter('tol_time', operators, { field: 'ts_trucktype.tol_time' })
    schema.filter('create_by', operators, { field: 'ts_trucktype.create_by' })
    schema.filter('create_date', operators, {
      field: 'ts_trucktype.create_date',
    })
    schema.filter('change_by', operators, { field: 'ts_trucktype.change_by' })
    schema.filter('change_date', operators, {
      field: 'ts_trucktype.change_date',
    })
    schema.filter('msrepl_tran_version', operators, {
      field: 'ts_trucktype.msrepl_tran_version',
    })

    // sorting
    schema.sort('truck_type', { field: 'ts_trucktype.truck_type' })
    schema.sort('truck_name', { field: 'ts_trucktype.truck_name' })
    schema.sort('base_low_wgt', { field: 'ts_trucktype.base_low_wgt' })
    schema.sort('tolerance', { field: 'ts_trucktype.tolerance' })
    schema.sort('max_diff_wgt', { field: 'ts_trucktype.max_diff_wgt' })
    schema.sort('tol_trans', { field: 'ts_trucktype.tol_trans' })
    schema.sort('tol_time', { field: 'ts_trucktype.tol_time' })
    schema.sort('create_by', { field: 'ts_trucktype.create_by' })
    schema.sort('create_date', { field: 'ts_trucktype.create_date' })
    schema.sort('change_by', { field: 'ts_trucktype.change_by' })
    schema.sort('change_date', { field: 'ts_trucktype.change_date' })
    schema.sort('msrepl_tran_version', {
      field: 'ts_trucktype.msrepl_tran_version',
    })
    schema.page(!!this.query.page)
  }

  'filter:q[=]'(builder, { value }) {
    value = `%${value}%`
    return builder.where(function () {
      this.orWhere('ts_trucktype.truck_type', 'like', value)
        .orWhere('ts_trucktype.truck_name', 'like', value)
        .orWhere('ts_trucktype.base_low_wgt', 'like', value)
        .orWhere('ts_trucktype.tolerance', 'like', value)
        .orWhere('ts_trucktype.max_diff_wgt', 'like', value)
        .orWhere('ts_trucktype.tol_trans', 'like', value)
        .orWhere('ts_trucktype.tol_time', 'like', value)
        .orWhere('ts_trucktype.create_by', 'like', value)
        .orWhere('ts_trucktype.create_date', 'like', value)
        .orWhere('ts_trucktype.change_by', 'like', value)
        .orWhere('ts_trucktype.change_date', 'like', value)
        .orWhere('ts_trucktype.msrepl_tran_version', 'like', value)
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
      builder.orderBy('ts_trucktype.truck_type', 'asc')
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
