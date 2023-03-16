const db = require('../db/index.js')
const getMessages = () => {
    const sql = 'select id,nickname,avatar,messageContent,time from tb_message'
    return db.execute(sql)
}
const insertMessage = (msg) => {
    const sql = 'insert into tb_message SET?'
    return db.execute(sql, msg)
}
module.exports = {
    getMessages,
    insertMessage
}