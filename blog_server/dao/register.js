const db = require('../db/index.js')
const addUserInfoOrAuth = (user) => {
    console.log(111,user);
    const sql = user.userInfoId ? "insert into tb_user_auth SET ?":"insert into tb_user_info SET ?"
    return db.execute(sql, user)
}
const getUserInfoId=(mail)=>{
    const sql="select id from tb_user_info where email=?"
    return db.execute(sql,mail)
}
const getPassword=(username)=>{
    const sql="select password from tb_user_auth where userName=?"
    return db.execute(sql,username)
}
const getUserInfo=(mail)=>{
    const sql="select id,email,nickname,avatar,website,intro from tb_user_info where email=?"
    return db.execute(sql,mail)
}
const updatePwd=(password,email)=>{
    const sql="update tb_user_auth set password = ? where userName=?"
    return db.execute(sql,password,email)
}
module.exports = {
    addUserInfoOrAuth,
    getUserInfoId,
    getPassword,
    getUserInfo,
    updatePwd
}