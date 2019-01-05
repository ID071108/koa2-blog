const user = require('../models/user')
const Api = require('../models/api')

module.exports = {
  login: async ctx => {
    await user.getUsers(ctx.request.body).then(res => {
      let _res = {
        result: res[0] || null,
        code: 200,
        msg: '请求成功'
      }
      ctx.response.body = _res
    })
  },
  getArticles: async ctx => {
    await Api.getArticles(ctx.request.body).then(res => {
      let _res = {
        result: res || null,
        code: 200,
        msg: '请求成功'
      }
      ctx.response.body = _res
    })
  }
}
