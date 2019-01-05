const dbUtils = require('../util/db-util')

const api = {
  async getArticles(options) {
    if (options) {
      console.log(options)
      let _sql = `SELECT * FROM articles`
      let result = await dbUtils.query(_sql)
      if (Array.isArray(result) && result.length > 0) {
        return result
      }
    }
    return []
  }
}

module.exports = api
