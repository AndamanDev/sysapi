const BaseQuerier = require('./base-querier')
const operators = require('./operators')
const _ = require('lodash')

class Querier extends BaseQuerier {
  defineSchema(schema) {
    // filtering
    schema.filter('q', '=')
    schema.filter('com_grade_code', operators, { field: 'vCom_grade_code.com_grade_code' })
    schema.filter('com_grade_name', operators, { field: 'vCom_grade_code.com_grade_name' })
    schema.filter('source', operators, { field: 'vCom_grade_code.source' })
    schema.filter('prd_grade_code', operators, { field: 'vCom_grade_code.prd_grade_code' })

    // sorting
    schema.sort('com_grade_code', { field: 'vCom_grade_code.com_grade_code' })
    schema.sort('com_grade_name', { field: 'vCom_grade_code.com_grade_name' })
    schema.sort('source', { field: 'vCom_grade_code.source' })
    schema.sort('prd_grade_code', { field: 'vCom_grade_code.prd_grade_code' })
    schema.page(!!this.query.page)
  }

  'filter:q[=]'(builder, { value }) {
    value = `%${value}%`
    return builder.where(function () {
      this.orWhere('vCom_grade_code.com_grade_code', 'like', value)
        .orWhere('vCom_grade_code.com_grade_name', 'like', value)
        .orWhere('vCom_grade_code.source', 'like', value)
        .orWhere('vCom_grade_code.prd_grade_code', 'like', value)
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

    if (_.get(this.query, 'page.number')) {
      builder.orderBy('vCom_grade_code.com_grade_code', 'asc')
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
