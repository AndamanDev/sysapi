const QueryQL = require('@truepic/queryql')
const _ = require('lodash')

class BaseQuerier extends QueryQL {
  get pageDefaults() {
    return {
      size: 50,
      number: 1,
    }
  }

  // async run() {
  //   super.run()

  //   let builder = this.builder
  //   let clone = builder.clone()
  //   console.log('clone', clone)
  //   clone._single = _.omit(clone._single, ['limit', 'offset'])
  //   // check get all rows
  //   if (_.get(this.query, 'page.size', 10) === -1) {
  //     builder = _.omit(builder, ['limit', 'offset'])
  //   }

  //   const page = _.get(this.query, 'page')
  //   const currentPage = parseInt(_.get(page, 'number', 1))
  //   const perPage = parseInt(_.get(page, 'size', this.pageDefaults.size))
  //   const offset = (currentPage - 1) * perPage

  //   const query = clone.toSQL()
  //   console.log('query', query)
  //   if (query.bindings) {
  //     for (let bind of query.bindings) {
  //       if (bind && typeof bind === 'number') {
  //         bind = parseInt(bind)
  //       } else {
  //         bind = `'${bind}'`
  //       }
  //       query.sql = String(query.sql).replace('?', bind)
  //     }
  //   }
  //   let sql = query.sql.replace(/.*from/, 'select TOP 1 COUNT(*) as total from')

  //   const total = await clone.client.raw(sql) // await clone.count('*', { as: 'totalCount' }).first()
  //   let count = 0
  //   if (total) {
  //     count = _.get(total, '[0].total', 0)
  //   }
  //   const totalCount = parseInt(count, 10)
  //   const pageCount = Math.ceil(totalCount / perPage)
  //   const rows = await builder

  //   return {
  //     total: totalCount,
  //     perPage: perPage,
  //     offset: offset,
  //     to: offset + rows.length,
  //     lastPage: Math.ceil(count / perPage),
  //     currentPage: currentPage,
  //     pageCount: pageCount,
  //     from: offset,
  //     data: rows,
  //   }
  // }
}

module.exports = BaseQuerier
