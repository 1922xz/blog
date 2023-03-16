const db = require('../db/index.js')
const getPhotoCoverList = (id) => {
    const sql = "select photoSrc from tb_photo where albumId=?"
    return db.execute(sql,id)
}
module.exports={
    getPhotoCoverList
}