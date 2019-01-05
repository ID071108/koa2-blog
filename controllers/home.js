const api = require('../models/api')

module.exports = async function(ctx, next) {
  await api
    .getArticles({
      pageSize: 10,
      pageCurrent: 1,
      id: 1
    })
    .then(async res => {
      await ctx.render('home', {
        articles: res
      })
    })
}
