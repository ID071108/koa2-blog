const api = require('../models/api')

module.exports = async function(ctx, next) {
  let _query = ctx.request.query
  await api
    .getArticles({
      pageSize: _query.pageSize || 10,
      pageCurrent: _query.pageCurrent || 1,
      id: 1
    })
    .then(async res => {
      let _count = res.count[0]['COUNT(*)']
      _count = Math.ceil(_count % 10)
      await ctx.render('chat', {
        articles: res.articles,
        count: _count
      })
    })
}
