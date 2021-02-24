const BaseQuerier = require('./base-querier')
const operators = require('./operators')
const _ = require('lodash')

class Querier extends BaseQuerier {
  defineSchema(schema) {
    // filtering
    schema.filter('q', '=')
    schema.filter('ret_code', operators, { field: 'ts_retail.ret_code' })
    schema.filter('ret_title', operators, { field: 'ts_retail.ret_title' })
    schema.filter('ret_name', operators, { field: 'ts_retail.ret_name' })
    schema.filter('ret_adr1', operators, { field: 'ts_retail.ret_adr1' })
    schema.filter('ret_adr2', operators, { field: 'ts_retail.ret_adr2' })
    schema.filter('zip_code', operators, { field: 'ts_retail.zip_code' })
    schema.filter('prov_code', operators, { field: 'ts_retail.prov_code' })
    schema.filter('con_p', operators, { field: 'ts_retail.con_p' })
    schema.filter('con_tel', operators, { field: 'ts_retail.con_tel' })
    schema.filter('fax', operators, { field: 'ts_retail.fax' })
    schema.filter('ret_email', operators, { field: 'ts_retail.ret_email' })
    schema.filter('ret_profile', operators, { field: 'ts_retail.ret_profile' })
    schema.filter('create_by', operators, { field: 'ts_retail.create_by' })
    schema.filter('create_date', operators, { field: 'ts_retail.create_date' })
    schema.filter('change_by', operators, { field: 'ts_retail.change_by' })
    schema.filter('change_date', operators, { field: 'ts_retail.change_date' })
    schema.filter('msrepl_tran_version', operators, {
      field: 'ts_retail.msrepl_tran_version',
    })
    schema.filter('RetailGroupID', operators, {
      field: 'ts_retail.RetailGroupID',
    })

    // sorting
    schema.sort('ret_code', { field: 'ts_retail.ret_code' })
    schema.sort('ret_title', { field: 'ts_retail.ret_title' })
    schema.sort('ret_name', { field: 'ts_retail.ret_name' })
    schema.sort('ret_adr1', { field: 'ts_retail.ret_adr1' })
    schema.sort('ret_adr2', { field: 'ts_retail.ret_adr2' })
    schema.sort('zip_code', { field: 'ts_retail.zip_code' })
    schema.sort('prov_code', { field: 'ts_retail.prov_code' })
    schema.sort('con_p', { field: 'ts_retail.con_p' })
    schema.sort('con_tel', { field: 'ts_retail.con_tel' })
    schema.sort('fax', { field: 'ts_retail.fax' })
    schema.sort('ret_email', { field: 'ts_retail.ret_email' })
    schema.sort('ret_profile', { field: 'ts_retail.ret_profile' })
    schema.sort('create_by', { field: 'ts_retail.create_by' })
    schema.sort('create_date', { field: 'ts_retail.create_date' })
    schema.sort('change_by', { field: 'ts_retail.change_by' })
    schema.sort('change_date', { field: 'ts_retail.change_date' })
    schema.sort('msrepl_tran_version', {
      field: 'ts_retail.msrepl_tran_version',
    })
    schema.sort('RetailGroupID', { field: 'ts_retail.RetailGroupID' })
    schema.page(!!this.query.page)
  }

  'filter:q[=]'(builder, { value }) {
    value = `%${value}%`
    return builder.where(function () {
      this.orWhere('ts_retail.ret_code', 'like', value)
        .orWhere('ts_retail.ret_title', 'like', value)
        .orWhere('ts_retail.ret_name', 'like', value)
        .orWhere('ts_retail.ret_adr1', 'like', value)
        .orWhere('ts_retail.ret_adr2', 'like', value)
        .orWhere('ts_retail.zip_code', 'like', value)
        .orWhere('ts_retail.prov_code', 'like', value)
        .orWhere('ts_retail.con_p', 'like', value)
        .orWhere('ts_retail.con_tel', 'like', value)
        .orWhere('ts_retail.fax', 'like', value)
        .orWhere('ts_retail.ret_email', 'like', value)
        .orWhere('ts_retail.ret_profile', 'like', value)
        .orWhere('ts_retail.create_by', 'like', value)
        .orWhere('ts_retail.create_date', 'like', value)
        .orWhere('ts_retail.change_by', 'like', value)
        .orWhere('ts_retail.change_date', 'like', value)
        .orWhere('ts_retail.msrepl_tran_version', 'like', value)
        .orWhere('ts_retail.RetailGroupID', 'like', value)
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
      builder.orderBy('ts_retail.ret_code', 'asc')
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
