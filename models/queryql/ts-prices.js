const BaseQuerier = require('./base-querier')
const operators = require('./operators')
const _ = require('lodash')

class Querier extends BaseQuerier {
  defineSchema(schema) {
    // filtering
    schema.filter('q', '=')
    schema.filter('pyear', operators, {
      field: 'vFindPriAnnFix_with_Freight.pyear',
    })
    schema.filter('period_no', operators, {
      field: 'vFindPriAnnFix_with_Freight.period_no',
    })
    schema.filter('trd_code', operators, {
      field: 'vFindPriAnnFix_with_Freight.trd_code',
    })
    schema.filter('ret_code', operators, {
      field: 'vFindPriAnnFix_with_Freight.ret_code',
    })
    schema.filter('wh_number', operators, {
      field: 'vFindPriAnnFix_with_Freight.wh_number',
    })
    schema.filter('com_grade_code', operators, {
      field: 'vFindPriAnnFix_with_Freight.com_grade_code',
    })
    schema.filter('freight_price', operators, {
      field: 'vFindPriAnnFix_with_Freight.freight_price',
    })
    schema.filter('loyalty_price', operators, {
      field: 'vFindPriAnnFix_with_Freight.loyalty_price',
    })
    schema.filter('wh_price', operators, {
      field: 'vFindPriAnnFix_with_Freight.wh_price',
    })
    schema.filter('addition_price', operators, {
      field: 'vFindPriAnnFix_with_Freight.addition_price',
    })
    schema.filter('spcadj_price', operators, {
      field: 'vFindPriAnnFix_with_Freight.spcadj_price',
    })
    schema.filter('create_by', operators, {
      field: 'vFindPriAnnFix_with_Freight.create_by',
    })
    schema.filter('create_date', operators, {
      field: 'vFindPriAnnFix_with_Freight.create_date',
    })
    schema.filter('change_by', operators, {
      field: 'vFindPriAnnFix_with_Freight.change_by',
    })
    schema.filter('change_date', operators, {
      field: 'vFindPriAnnFix_with_Freight.change_date',
    })
    schema.filter('trd_name', operators, {
      field: 'vFindPriAnnFix_with_Freight.trd_name',
    })
    schema.filter('trd_title', operators, {
      field: 'vFindPriAnnFix_with_Freight.trd_title',
    })
    schema.filter('ret_title', operators, {
      field: 'vFindPriAnnFix_with_Freight.ret_title',
    })
    schema.filter('ret_name', operators, {
      field: 'vFindPriAnnFix_with_Freight.ret_name',
    })
    schema.filter('wh_name', operators, {
      field: 'vFindPriAnnFix_with_Freight.wh_name',
    })
    schema.filter('com_grade_name', operators, {
      field: 'vFindPriAnnFix_with_Freight.com_grade_name',
    })
    schema.filter('effdate_from', operators, {
      field: 'vFindPriAnnFix_with_Freight.effdate_from',
    })
    schema.filter('effdate_to', operators, {
      field: 'vFindPriAnnFix_with_Freight.effdate_to',
    })
    schema.filter('status', operators, {
      field: 'vFindPriAnnFix_with_Freight.status',
    })

    // sorting
    schema.sort('pyear', { field: 'vFindPriAnnFix_with_Freight.pyear' })
    schema.sort('period_no', { field: 'vFindPriAnnFix_with_Freight.period_no' })
    schema.sort('trd_code', { field: 'vFindPriAnnFix_with_Freight.trd_code' })
    schema.sort('ret_code', { field: 'vFindPriAnnFix_with_Freight.ret_code' })
    schema.sort('wh_number', { field: 'vFindPriAnnFix_with_Freight.wh_number' })
    schema.sort('com_grade_code', {
      field: 'vFindPriAnnFix_with_Freight.com_grade_code',
    })
    schema.sort('freight_price', {
      field: 'vFindPriAnnFix_with_Freight.freight_price',
    })
    schema.sort('loyalty_price', {
      field: 'vFindPriAnnFix_with_Freight.loyalty_price',
    })
    schema.sort('wh_price', { field: 'vFindPriAnnFix_with_Freight.wh_price' })
    schema.sort('addition_price', {
      field: 'vFindPriAnnFix_with_Freight.addition_price',
    })
    schema.sort('spcadj_price', {
      field: 'vFindPriAnnFix_with_Freight.spcadj_price',
    })
    schema.sort('create_by', { field: 'vFindPriAnnFix_with_Freight.create_by' })
    schema.sort('create_date', {
      field: 'vFindPriAnnFix_with_Freight.create_date',
    })
    schema.sort('change_by', { field: 'vFindPriAnnFix_with_Freight.change_by' })
    schema.sort('change_date', {
      field: 'vFindPriAnnFix_with_Freight.change_date',
    })
    schema.sort('trd_name', { field: 'vFindPriAnnFix_with_Freight.trd_name' })
    schema.sort('trd_title', { field: 'vFindPriAnnFix_with_Freight.trd_title' })
    schema.sort('ret_title', { field: 'vFindPriAnnFix_with_Freight.ret_title' })
    schema.sort('ret_name', { field: 'vFindPriAnnFix_with_Freight.ret_name' })
    schema.sort('wh_name', { field: 'vFindPriAnnFix_with_Freight.wh_name' })
    schema.sort('com_grade_name', {
      field: 'vFindPriAnnFix_with_Freight.com_grade_name',
    })
    schema.sort('effdate_from', {
      field: 'vFindPriAnnFix_with_Freight.effdate_from',
    })
    schema.sort('effdate_to', {
      field: 'vFindPriAnnFix_with_Freight.effdate_to',
    })
    schema.sort('status', {
      field: 'vFindPriAnnFix_with_Freight.status',
    })
    schema.page(!!this.query.page)
  }

  'filter:q[=]'(builder, { value }) {
    value = `%${value}%`
    return builder.where(function () {
      this.orWhere('vFindPriAnnFix_with_Freight.pyear', 'like', value)
        .orWhere('vFindPriAnnFix_with_Freight.period_no', 'like', value)
        .orWhere('vFindPriAnnFix_with_Freight.trd_code', 'like', `${value}`)
        .orWhere('vFindPriAnnFix_with_Freight.ret_code', 'like', value)
        .orWhere('vFindPriAnnFix_with_Freight.wh_number', 'like', value)
        .orWhere('vFindPriAnnFix_with_Freight.com_grade_code', 'like', value)
        .orWhere('vFindPriAnnFix_with_Freight.freight_price', 'like', value)
        .orWhere('vFindPriAnnFix_with_Freight.loyalty_price', 'like', value)
        .orWhere('vFindPriAnnFix_with_Freight.wh_price', 'like', value)
        .orWhere('vFindPriAnnFix_with_Freight.addition_price', 'like', value)
        .orWhere('vFindPriAnnFix_with_Freight.spcadj_price', 'like', value)
        .orWhere('vFindPriAnnFix_with_Freight.create_by', 'like', value)
        .orWhere('vFindPriAnnFix_with_Freight.create_date', 'like', value)
        .orWhere('vFindPriAnnFix_with_Freight.change_by', 'like', value)
        .orWhere('vFindPriAnnFix_with_Freight.change_date', 'like', value)
        .orWhere('vFindPriAnnFix_with_Freight.trd_name', 'like', value)
        .orWhere('vFindPriAnnFix_with_Freight.trd_title', 'like', value)
        .orWhere('vFindPriAnnFix_with_Freight.ret_title', 'like', value)
        .orWhere('vFindPriAnnFix_with_Freight.ret_name', 'like', value)
        .orWhere('vFindPriAnnFix_with_Freight.wh_name', 'like', value)
        .orWhere('vFindPriAnnFix_with_Freight.com_grade_name', 'like', value)
        .orWhere('vFindPriAnnFix_with_Freight.effdate_from', 'like', value)
        .orWhere('vFindPriAnnFix_with_Freight.effdate_to', 'like', value)
    })
  }

  'filter:trd_code[=]'(builder, { value }) {
    return builder.where('vFindPriAnnFix_with_Freight.trd_code', `${value}`)
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
      builder.orderBy('vFindPriAnnFix_with_Freight.trd_code', 'asc')
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
