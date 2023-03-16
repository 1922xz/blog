// 导入express
const express = require('express')
// 创建服务器实例对象
const app = express()
// // 导入用于跨域的中间件
const cors = require('cors')
// 允许跨域
app.use(cors())
// socket模块
require('./bin/webSocketServer.js')


// 解析form-data
const formidable = require('express-formidable')
app.use(formidable())
// 解析post参数
// const bodyParser = require('body-parser')
// app.use(bodyParser.json({ limit: '1mb' }))
// app.use(bodyParser.urlencoded({ extended: false }))

const expressJWT = require('express-jwt')
app.use(expressJWT({
    secret: '1922xz'
}).unless({
    path: [/\/api\/*/]
}))
const verify = require('./config/verify.js')
app.use((req, res, next) => {
    var token = req.headers['authorization']||req.query.token;
    // console.log(token);
    // console.log('aatoken:' + token.split(' ')[1]);
    if (token == undefined) {
        return next();
    } else {
        verify.getToken(token).then((data) => {
            console.log(data);
            req.data = data;
            return next();
        }).catch((error) => {
            return next();
        })
    }
})


// 一定要在路由之前封装res.cc()函数
app.use((req, res, next) => {
    res.cc = (data = [],msg='', status = 200) => {
        if(data){
            res.send(data)
        }else if (msg){
            res.send(msg)
        }
    }
    next()
})
const articleRouter = require('./router/articles.js')
const albumRouter = require('./router/album.js')
const photoRouter = require('./router/photo.js')
const categoryRouter = require('./router/category.js')
const tagRouter = require('./router/tag.js')
const talkRouter = require('./router/talk.js')
const qqmailRouter = require('./router/qqmail.js')
const registerRouter = require('./router/user.js')
const messageRouter = require('./router/message')
const commentRouter = require('./router/comment')
const websiteConfigRouter = require('./router/websiteConfig.js')
app.use('/api', [
    registerRouter,
    qqmailRouter,
    talkRouter,
    tagRouter,
    categoryRouter,
    photoRouter,
    albumRouter,
    articleRouter,
    messageRouter,
    commentRouter,
    websiteConfigRouter])

// const authRouter = require('./router/auth.js')
// app.use('/auth', authRouter)


const menuRouter = require('./router/menu')
const roleRouter = require('./router/role')
app.use('/api/admin', [menuRouter,roleRouter])


app.use(function (err, req, res, next) {
    if (err.status == 401) {
        return res.status(401).send('未认证');
    }
});
// 启动服务器
app.listen(3008, () => {
    console.log('服务器启动了');
})