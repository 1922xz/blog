const { findCode } = require('../config/fs')
const { defaultAvatar } = require('../config/default.js')
const registerDao = require('../dao/register.js')
const verify = require('../config/verify.js')
// 对密码加密
const bcrypt = require('bcryptjs')
const register = async (req, res) => {
    const user = req.fields
    console.log('注册',user);
    const result = await findCode(user.username)
    if (result.code !== user.code) {
        return res.send({ data: { "flag": false, "message": '验证码错误' } })
    }
    // 查重
    const chachong = await registerDao.getUserInfoId(user.username)
    if (chachong[0]) {
        return res.send({
            data: {
                flag: false,
                message: "该用户名已注册"
            }
        })
    }
    const userinfo = {
        email: user.username,
        nickname: "用户" + Math.floor(Math.random() * Math.pow(10, 10)),
        avatar: defaultAvatar,
        isDisable: 0,
        createTime: new Date().toLocaleString('zh', { hour12: false }).replace(/\//g, "-")
    }
    console.log(userinfo);
    const userAuth = await registerDao.addUserInfoOrAuth(userinfo).then(async (resp) => {
        console.log(resp);
        const userInfoId = await registerDao.getUserInfoId(user.username)
        return {
            userInfoId: userInfoId[0].id,
            userName: user.username,
            password: bcrypt.hashSync(user.password, 10),
            loginType: 1,
            createTime: new Date().toLocaleString('zh', { hour12: false }).replace(/\//g, "-")
        }
    })
    await registerDao.addUserInfoOrAuth(userAuth).then(resp => {
        res.send({ data: { "flag": true } })
    })

}
const login = async (req, res) => {
    const user = req.fields
    // console.log('前端登录信息',user);
    // 获取用户名和密码
    const result = await registerDao.getPassword(user.username)
    // 密码解密
    const compareResult = bcrypt.compareSync(user.password, result[0] ? result[0].password : "")
    if (!compareResult) {
        return res.status(202).send({
            data: {
                message: "用户名或密码错误"
            }
        })
    }
    // console.log(user);
    // 密码正确获取用户信息
    const userinfo = await registerDao.getUserInfo(user.username)
    // 开始生成token
    const token = await verify.setToken(user.username)
    res.status(200).send({
        data: {
            token,
            flag: true,
            userinfo: userinfo[0]
        }
    })
    // res.send({data:{}})
}
const forget = async (req, res) => {
    const user = req.fields
    console.log('忘记密码', user);
    // debugger
    const result = await findCode(user.username)
    if (result.code !== user.code) {
        return res.send({ data: { "flag": false, "message": '验证码错误' } })
    }
    const password = bcrypt.hashSync(user.password, 10)
    const resp = await registerDao.updatePwd(password, user.username)
    if (resp.affectedRows === 1) {
        res.send({
            data: {
                flag: true,
                message: "更改成功"
            }
        })
    } else {
        res.send({
            data: {
                flag: false,
                message: "用户未注册，请先注册"
            }
        })
    }
}
module.exports = {
    register,
    login,
    forget
}