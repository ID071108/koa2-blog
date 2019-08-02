const dbUtils = require('../util/db-util')

const api = {
  async getArticles(options) {
    if (options) {
      let _start = (options.pageCurrent - 1) * options.pageSize
      let _end = options.pageCurrent * options.pageSize
      let _sql1 = `SELECT COUNT(*) FROM articles`
      let _sql2 = `SELECT * FROM articles limit ${_start},${_end}`
      let count = await dbUtils.query(_sql1)
      let result = await dbUtils.query(_sql2)
      if (Array.isArray(result) && result.length > 0) {
        return {
          articles: result,
          count: count
        }
      }
    }
    return []
  },
  async postBlog(options) {
    if (options) {
    }
  }
}

module.exports = api
