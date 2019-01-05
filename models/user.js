const dbUtils = require('../util/db-util')

const user = {
  async getUsers(options) {
    if (options) {
      let _sql = `SELECT * FROM users WHERE account="${
        options.account
      }" AND password="${options.password}"`
      let result = await dbUtils.query(_sql)
      if (Array.isArray(result) && result.length > 0) {
        console.log(result, 12345679)
        return result
      }
    }
    return []
  }
}

module.exports = user
