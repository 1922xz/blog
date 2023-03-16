const db = require('../db/index.js')
const getNinameAndAvatar = (id=1) => {
    const sql = 'select nickname ,avatar from tb_user_info where id=?'
    return db.execute(sql ,id)
}
const getUserInfo=(id)=>{
    const sql='select * from tb_user_info where id='+id
    return db.execute(sql)
}
const getUserInfoId = (name) => {
    console.log(name);
    const sql = 'select userInfoId from tb_user_auth where userName=' + '"'+name+'"'
    // console.log(sql);
    return db.execute(sql)
}
module.exports = {
    getNinameAndAvatar,
    getUserInfo,
    getUserInfoId
}