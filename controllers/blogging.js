module.exports = async function(ctx, next) {
  let title = 'edit page'
  await ctx.render('blogging', {
    title
  })
}
