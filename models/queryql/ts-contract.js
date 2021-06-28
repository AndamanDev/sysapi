const BaseQuerier = require('./base-querier')
const operators = require('./operators')
const _ = require('lodash')

class Querier extends BaseQuerier {
  defineSchema(schema) {
    // filtering
    schema.filter('q', '=')
	schema.filter('status', operators, { field: 'vRptContractPrice.status' })
	schema.filter('tot_actwgt', operators, { field: 'vRptContractPrice.tot_actwgt' })
    schema.filter('pyear', operators, { field: 'vRptContractPrice.pyear' })
    schema.filter('trd_code', operators, {
      field: 'vRptContractPrice.trd_code',
    })
    schema.filter('contract_no', operators, {
      field: 'vRptContractPrice.contract_no',
    })
    schema.filter('contract_price', operators, {
      field: 'vRptContractPrice.contract_price',
    })
    schema.filter('loyalty_price', operators, {
      field: 'vRptContractPrice.loyalty_price',
    })
    schema.filter('wh_price', operators, {
      field: 'vRptContractPrice.wh_price',
    })
    schema.filter('addition_price', operators, {
      field: 'vRptContractPrice.addition_price',
    })
    schema.filter('sup_code_freight', operators, {
      field: 'vRptContractPrice.sup_code_freight',
    })
    schema.filter('sup_title_freight', operators, {
      field: 'vRptContractPrice.sup_title_freight',
    })
    schema.filter('sup_name_freight', operators, {
      field: 'vRptContractPrice.sup_name_freight',
    })
    schema.filter('freight_price', operators, {
      field: 'vRptContractPrice.freight_price',
    })
    schema.filter('sup_code_cut', operators, {
      field: 'vRptContractPrice.sup_code_cut',
    })
    schema.filter('sup_title_cut', operators, {
      field: 'vRptContractPrice.sup_title_cut',
    })
    schema.filter('sup_title_name', operators, {
      field: 'vRptContractPrice.sup_title_name',
    })
    schema.filter('cut_price', '=', { field: 'vRptContractPrice.cut_price' })
    schema.filter('ret_code', '=', { field: 'vRptContractPrice.ret_code' })
    schema.filter('wh_number', '=', { field: 'vRptContractPrice.wh_number' })
    schema.filter('ret_title', '=', { field: 'vRptContractPrice.ret_title' })
    schema.filter('ret_name', '=', { field: 'vRptContractPrice.ret_name' })
    schema.filter('wh_name', '=', { field: 'vRptContractPrice.wh_name' })
    schema.filter('rev_no', '=', { field: 'vRptContractPrice.rev_no' })
    schema.filter('tot_estwgt', '=', { field: 'vRptContractPrice.tot_estwgt' })
    schema.filter('tot_wgtlimit', '=', {
      field: 'vRptContractPrice.tot_wgtlimit',
    })
    schema.filter('gain_qb', '=', { field: 'vRptContractPrice.gain_qb' })
    schema.filter('effdate_from', '=', {
      field: 'vRptContractPrice.effdate_from',
    })
    schema.filter('effdate_to', '=', { field: 'vRptContractPrice.effdate_to' })
    schema.filter('ver_by', '=', { field: 'vRptContractPrice.ver_by' })
    schema.filter('ver_date', '=', { field: 'vRptContractPrice.ver_date' })
    schema.filter('apprv_by', '=', { field: 'vRptContractPrice.apprv_by' })
    schema.filter('apprv_date', '=', { field: 'vRptContractPrice.apprv_date' })
    schema.filter('create_by', '=', { field: 'vRptContractPrice.create_by' })
    schema.filter('create_date', '=', {
      field: 'vRptContractPrice.create_date',
    })
    schema.filter('com_grade_name', '=', {
      field: 'vRptContractPrice.com_grade_name',
    })
    schema.filter('est_wgt', '=', { field: 'vRptContractPrice.est_wgt' })
    schema.filter('trd_title', '=', { field: 'vRptContractPrice.trd_title' })
    schema.filter('trd_name', '=', { field: 'vRptContractPrice.trd_name' })
    schema.filter('state_scrap', '=', {
      field: 'vRptContractPrice.state_scrap',
    })
    schema.filter('pay', '=', { field: 'vRptContractPrice.pay' })
    schema.filter('reference', '=', { field: 'vRptContractPrice.reference' })

    // sorting
    schema.sort('pyear', { field: 'vRptContractPrice.pyear' })
    schema.sort('trd_code', { field: 'vRptContractPrice.trd_code' })
    schema.sort('contract_no', { field: 'vRptContractPrice.contract_no' })
    schema.sort('contract_price', { field: 'vRptContractPrice.contract_price' })
    schema.sort('loyalty_price', { field: 'vRptContractPrice.loyalty_price' })
    schema.sort('wh_price', { field: 'vRptContractPrice.wh_price' })
    schema.sort('addition_price', { field: 'vRptContractPrice.addition_price' })
    schema.sort('sup_code_freight', {
      field: 'vRptContractPrice.sup_code_freight',
    })
    schema.sort('sup_title_freight', {
      field: 'vRptContractPrice.sup_title_freight',
    })
    schema.sort('sup_name_freight', {
      field: 'vRptContractPrice.sup_name_freight',
    })
    schema.sort('freight_price', { field: 'vRptContractPrice.freight_price' })
    schema.sort('sup_code_cut', { field: 'vRptContractPrice.sup_code_cut' })
    schema.sort('sup_title_cut', { field: 'vRptContractPrice.sup_title_cut' })
    schema.sort('sup_title_name', { field: 'vRptContractPrice.sup_title_name' })
    schema.sort('cut_price', { field: 'vRptContractPrice.cut_price' })
    schema.sort('ret_code', { field: 'vRptContractPrice.ret_code' })
    schema.sort('wh_number', { field: 'vRptContractPrice.wh_number' })
    schema.sort('ret_title', { field: 'vRptContractPrice.ret_title' })
    schema.sort('ret_name', { field: 'vRptContractPrice.ret_name' })
    schema.sort('wh_name', { field: 'vRptContractPrice.wh_name' })
    schema.sort('rev_no', { field: 'vRptContractPrice.rev_no' })
    schema.sort('tot_estwgt', { field: 'vRptContractPrice.tot_estwgt' })
    schema.sort('tot_wgtlimit', { field: 'vRptContractPrice.tot_wgtlimit' })
    schema.sort('gain_qb', { field: 'vRptContractPrice.gain_qb' })
    schema.sort('effdate_from', { field: 'vRptContractPrice.effdate_from' })
    schema.sort('effdate_to', { field: 'vRptContractPrice.effdate_to' })
    schema.sort('ver_by', { field: 'vRptContractPrice.ver_by' })
    schema.sort('ver_date', { field: 'vRptContractPrice.ver_date' })
    schema.sort('apprv_by', { field: 'vRptContractPrice.apprv_by' })
    schema.sort('apprv_date', { field: 'vRptContractPrice.apprv_date' })
    schema.sort('create_by', { field: 'vRptContractPrice.create_by' })
    schema.sort('create_date', { field: 'vRptContractPrice.create_date' })
    schema.sort('com_grade_name', { field: 'vRptContractPrice.com_grade_name' })
    schema.sort('est_wgt', { field: 'vRptContractPrice.est_wgt' })
    schema.sort('trd_title', { field: 'vRptContractPrice.trd_title' })
    schema.sort('trd_name', { field: 'vRptContractPrice.trd_name' })
    schema.sort('state_scrap', { field: 'vRptContractPrice.state_scrap' })
    schema.sort('pay', { field: 'vRptContractPrice.pay' })
    schema.sort('reference', { field: 'vRptContractPrice.reference' })
    schema.page(!!this.query.page)
  }

  'filter:q[=]'(builder, { value }) {
    value = `%${value}%`
    return builder.where(function () {
      this.orWhere('vRptContractPrice.pyear', 'like', value)
        .orWhere('vRptContractPrice.trd_code', 'like', value)
        .orWhere('vRptContractPrice.contract_no', 'like', value)
        .orWhere('vRptContractPrice.contract_price', 'like', value)
        .orWhere('vRptContractPrice.loyalty_price', 'like', value)
        .orWhere('vRptContractPrice.wh_price', 'like', value)
        .orWhere('vRptContractPrice.addition_price', 'like', value)
        .orWhere('vRptContractPrice.sup_code_freight', 'like', value)
        .orWhere('vRptContractPrice.sup_title_freight', 'like', value)
        .orWhere('vRptContractPrice.sup_name_freight', 'like', value)
        .orWhere('vRptContractPrice.freight_price', 'like', value)
        .orWhere('vRptContractPrice.sup_code_cut', 'like', value)
        .orWhere('vRptContractPrice.sup_title_cut', 'like', value)
        .orWhere('vRptContractPrice.sup_title_name', 'like', value)
        .orWhere('vRptContractPrice.cut_price', 'like', value)
        .orWhere('vRptContractPrice.ret_code', 'like', value)
        .orWhere('vRptContractPrice.wh_number', 'like', value)
        .orWhere('vRptContractPrice.ret_title', 'like', value)
        .orWhere('vRptContractPrice.ret_name', 'like', value)
        .orWhere('vRptContractPrice.wh_name', 'like', value)
        .orWhere('vRptContractPrice.rev_no', 'like', value)
        .orWhere('vRptContractPrice.tot_estwgt', 'like', value)
        .orWhere('vRptContractPrice.tot_wgtlimit', 'like', value)
        .orWhere('vRptContractPrice.gain_qb', 'like', value)
        .orWhere('vRptContractPrice.effdate_from', 'like', value)
        .orWhere('vRptContractPrice.effdate_to', 'like', value)
        .orWhere('vRptContractPrice.ver_by', 'like', value)
        .orWhere('vRptContractPrice.ver_date', 'like', value)
        .orWhere('vRptContractPrice.apprv_by', 'like', value)
        .orWhere('vRptContractPrice.apprv_date', 'like', value)
        .orWhere('vRptContractPrice.create_by', 'like', value)
        .orWhere('vRptContractPrice.create_date', 'like', value)
        .orWhere('vRptContractPrice.com_grade_name', 'like', value)
        .orWhere('vRptContractPrice.est_wgt', 'like', value)
        .orWhere('vRptContractPrice.trd_title', 'like', value)
        .orWhere('vRptContractPrice.trd_name', 'like', value)
        .orWhere('vRptContractPrice.state_scrap', 'like', value)
        .orWhere('vRptContractPrice.pay', 'like', value)
        .orWhere('vRptContractPrice.reference', 'like', value)
		.orWhere('vRptContractPrice.status', 'like', value)
		.orWhere('vRptContractPrice.tot_actwgt', 'like', value)
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
      builder.orderBy('vRptContractPrice.trd_code', 'asc')
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
