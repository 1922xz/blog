// 导入express
const express = require('express')
// 创建服务器实例对象
const app = express()
// // 导入用于跨域的中间件
const cors = require('cors')
// 查看日志
const logger = require('morgan');
app.use(logger('dev'));
// 允许跨域
app.use(cors())
// socket模块
require('./bin/webSocketServer.js')
// 解析form-data
const formidable = require('express-formidable')
app.use(formidable())
// 使用jwt解析token
const expressJWT = require('express-jwt')
app.use(/\/api\/admin*/, expressJWT({
    secret: '1922xz',
    getToken(req) {
        if (req.headers.authorization) {
            return req.headers.authorization.split(' ')[0]
        } else if (req.query && req.query.token) {
            return req.query.token
        }
        return null
    }
}))

// 通过角色权限限制接口
app.use(/\/api\/admin\/auth*/, async (req, res, next) => {
    const roleDao = require('./dao/role')
    const userDao = require('./dao/user')
    let userInfoId = await userDao.getUserInfoId(req.user.name)
    let roleId = await roleDao.getRoleId(userInfoId[0].userInfoId)
    let role = await roleDao.getRoleById(roleId[0].roleId)
    if (role[0].roleLabel !== 'admin') {
        return res.send({
            flag: false,
            message: "权限不足"
        })
    } else {
        return next();
    }
})


// 一定要在路由之前封装res.cc()函数
app.use((req, res, next) => {
    res.cc = (data = [], msg = '', status = 200) => {
        if (data) {
            res.send(data)
        } else if (msg) {
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
app.use('/api/admin', [roleRouter, menuRouter])

const createError = require('http-errors')
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('error');
});
// app.use(function (err, req, res, next) {
//     if (err.status == 401) {
//         return res.status(401).send('未认证');
//     }
// });
// 启动服务器
app.listen(3008, () => {
    console.log('服务器启动了');
})