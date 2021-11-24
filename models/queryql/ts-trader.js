const BaseQuerier = require('./base-querier')
const operators = require('./operators')
const _ = require('lodash')

class Querier extends BaseQuerier {
  defineSchema(schema) {
    // filtering
    schema.filter('q', '=')
    schema.filter('trd_code', operators, { field: 'ts_trader.trd_code' })
    schema.filter('trd_title', operators, { field: 'ts_trader.trd_title' })
    schema.filter('trd_name', operators, { field: 'ts_trader.trd_name' })
    schema.filter('trd_adr1', operators, { field: 'ts_trader.trd_adr1' })
    schema.filter('trd_adr2', operators, { field: 'ts_trader.trd_adr2' })
    schema.filter('trdsap_code', operators, { field: 'ts_trader.trdsap_code' })
    schema.filter('prov_code', operators, { field: 'ts_trader.prov_code' })
    schema.filter('zip_code', operators, { field: 'ts_trader.zip_code' })
    schema.filter('cn_p1', operators, { field: 'ts_trader.cn_p1' })
    schema.filter('cn_p1_tel', operators, { field: 'ts_trader.cn_p1_tel' })
    schema.filter('cn_p2', operators, { field: 'ts_trader.cn_p2' })
    schema.filter('cn_p2_tel', operators, { field: 'ts_trader.cn_p2_tel' })
    schema.filter('cn_p3', operators, { field: 'ts_trader.cn_p3' })
    schema.filter('cn_p3_tel', operators, { field: 'ts_trader.cn_p3_tel' })
    schema.filter('fax1', operators, { field: 'ts_trader.fax1' })
    schema.filter('fax2', operators, { field: 'ts_trader.fax2' })
    schema.filter('trd_email', operators, { field: 'ts_trader.trd_email' })
    schema.filter('trd_class', operators, { field: 'ts_trader.trd_class' })
    schema.filter('eval_grade', operators, { field: 'ts_trader.eval_grade' })
    schema.filter('trd_profile', operators, { field: 'ts_trader.trd_profile' })
    schema.filter('create_by', operators, { field: 'ts_trader.create_by' })
    schema.filter('create_date', operators, { field: 'ts_trader.create_date' })
    schema.filter('change_by', operators, { field: 'ts_trader.change_by' })
    schema.filter('change_date', operators, { field: 'ts_trader.change_date' })
    schema.filter('msrepl_tran_version', operators, {
      field: 'ts_trader.msrepl_tran_version',
    })

    // sorting
    schema.sort('trd_code', { field: 'ts_trader.trd_code' })
    schema.sort('trd_title', { field: 'ts_trader.trd_title' })
    schema.sort('trd_name', { field: 'ts_trader.trd_name' })
    schema.sort('trd_adr1', { field: 'ts_trader.trd_adr1' })
    schema.sort('trd_adr2', { field: 'ts_trader.trd_adr2' })
    schema.sort('trdsap_code', { field: 'ts_trader.trdsap_code' })
    schema.sort('prov_code', { field: 'ts_trader.prov_code' })
    schema.sort('zip_code', { field: 'ts_trader.zip_code' })
    schema.sort('cn_p1', { field: 'ts_trader.cn_p1' })
    schema.sort('cn_p1_tel', { field: 'ts_trader.cn_p1_tel' })
    schema.sort('cn_p2', { field: 'ts_trader.cn_p2' })
    schema.sort('cn_p2_tel', { field: 'ts_trader.cn_p2_tel' })
    schema.sort('cn_p3', { field: 'ts_trader.cn_p3' })
    schema.sort('cn_p3_tel', { field: 'ts_trader.cn_p3_tel' })
    schema.sort('fax1', { field: 'ts_trader.fax1' })
    schema.sort('fax2', { field: 'ts_trader.fax2' })
    schema.sort('trd_email', { field: 'ts_trader.trd_email' })
    schema.sort('trd_class', { field: 'ts_trader.trd_class' })
    schema.sort('eval_grade', { field: 'ts_trader.eval_grade' })
    schema.sort('trd_profile', { field: 'ts_trader.trd_profile' })
    schema.sort('create_by', { field: 'ts_trader.create_by' })
    schema.sort('create_date', { field: 'ts_trader.create_date' })
    schema.sort('change_by', { field: 'ts_trader.change_by' })
    schema.sort('change_date', { field: 'ts_trader.change_date' })
    schema.sort('msrepl_tran_version', {
      field: 'ts_trader.msrepl_tran_version',
    })
    schema.page(!!this.query.page)
  }

  'filter:q[=]'(builder, { value }) {
    value = `%${value}%`
    return builder.where(function () {
      this.orWhere('ts_trader.trd_code', 'like', `'${value}'`)
      this.orWhere('ts_trader.trd_title', 'like', value)
      this.orWhere('ts_trader.trd_name', 'like', value)
      this.orWhere('ts_trader.trd_adr1', 'like', value)
      this.orWhere('ts_trader.trd_adr2', 'like', value)
      this.orWhere('ts_trader.trdsap_code', 'like', value)
      this.orWhere('ts_trader.prov_code', 'like', value)
      this.orWhere('ts_trader.zip_code', 'like', value)
      this.orWhere('ts_trader.cn_p1', 'like', value)
      this.orWhere('ts_trader.cn_p1_tel', 'like', value)
      this.orWhere('ts_trader.cn_p2', 'like', value)
      this.orWhere('ts_trader.cn_p2_tel', 'like', value)
      this.orWhere('ts_trader.cn_p3', 'like', value)
      this.orWhere('ts_trader.cn_p3_tel', 'like', value)
      this.orWhere('ts_trader.fax1', 'like', value)
      this.orWhere('ts_trader.fax2', 'like', value)
      this.orWhere('ts_trader.trd_email', 'like', value)
      this.orWhere('ts_trader.trd_class', 'like', value)
      this.orWhere('ts_trader.eval_grade', 'like', value)
      this.orWhere('ts_trader.trd_profile', 'like', value)
      this.orWhere('ts_trader.create_by', 'like', value)
      this.orWhere('ts_trader.create_date', 'like', value)
      this.orWhere('ts_trader.change_by', 'like', value)
      this.orWhere('ts_trader.change_date', 'like', value)
      this.orWhere('ts_trader.msrepl_tran_version', 'like', value)
    })
  }

  'filter:trd_code[=]'(builder, { value }) {
    return builder.where('ts_trader.trd_code', `'${value}'`)
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
      builder.orderBy('ts_trader.trd_code', 'asc')
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
