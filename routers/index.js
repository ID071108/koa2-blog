/**
 * 整合所有的路由
 */

const router = require('koa-router')()
const Home = require('../controllers/home')
const Blogging = require('../controllers/blogging')
const Other = require('../controllers/other')
const Chat = require('../controllers/chat')
const Api = require('../controllers/api')

router.get('/home', Home)
router.get('/blogging', Blogging)
router.get('/other', Other)
router.get('/chat', Chat)
router.post('/login', Api.login)
router.post('/getArticles', Api.getArticles)
router.post('/signin', Api.signin)

module.exports = router
