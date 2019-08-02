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
  },
  async signin(options) {
    console.log(options)
    if (options) {
      // let _sql = `insert into users set account=123123123,password=111111,nickname=1,phone=0,slogan=0,email=0,sex=0,profession=0`

      // let _sql = `insert into users set account=${options.account},password=${
      //   options.password
      // },nickname=${options.nickname},phone=${options.phone},slogan=${
      //   options.slogan
      // },email=${options.email || '暂未设置邮箱'},sex=${
      //   options.sex
      // },profession=${options.profession}`
      let _sql = `insert into users set account="${options.account}",password=${
        options.password
      },nickname="${options.nickname || ''}",phone=${options.phone ||
        ''},slogan=${options.slogan || ''},email="${options.email ||
        ''}",sex=${options.sex && 1},profession="${options.profession || ''}"`
      let result = await dbUtils.query(_sql)
      console.log(result, 12345679)
      return result
    }
    return []
  }
}

module.exports = user
