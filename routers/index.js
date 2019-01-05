/**
 * 整合所有的路由
 */

const router = require('koa-router')()
const Home = require('../controllers/home')
const Other = require('../controllers/other')
const Api = require('../controllers/api')

router.get('/home', Home)
router.get('/other', Other)
router.post('/login', Api.login)
router.post('/getArticles', Api.getArticles)

module.exports = router
