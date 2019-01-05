module.exports = async function(ctx, next) {
  let title = 'other page'
  await ctx.render('other', {
    title
  })
}
