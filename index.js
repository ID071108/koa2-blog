const path = require('path')
const config = require('./config')
const koa = require('koa')
const koaViews = require('koa-views')
const koaStatic = require('koa-static')
const koaLogger = require('koa-logger')
const koaBodyParser = require('koa-bodyparser')
const router = require('./routers')
// const router = require('koa-router')()
const app = new koa()

// 配置控制台日志中间件
app.use(koaLogger())

// 配置ctx.body解析中间件
app.use(koaBodyParser())

// 配置静态资源加载中间件
app.use(koaStatic(path.join(__dirname, './static')))

// 配置服务端模版渲染引擎中间件
app.use(
  koaViews(path.join(__dirname, './views'), {
    extension: 'ejs'
  })
)

// 初始化路由中间件
app.use(router.routes()).use(router.allowedMethods())

// 监听启动端口
app.listen(config.port, () => {
  console.log('the server listening on port:3000')
})
