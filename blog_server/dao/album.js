const db = require('../db/index.js')
const getAlbum = () => {
    const sql = 'select id,albumName,albumDesc,albumCover from tb_photo_album'
    return db.execute(sql)
}
const getAlbumById = (id) => {
    const sql = 'select albumName,albumCover from tb_photo_album where id=?'
    return db.execute(sql, id)
}


// const a = () => {
//     var A = {
//         id:1,
//         type:2,
//     }
//     var a=['id=1','type=1']
//     let b = a.toString().replace(',', ' and ')
//     const sql = "select * from tb_article where " +b

//     db.query(sql, (ERR, result) => {
//         console.log(result);
//     })
// }
// a()
module.exports = {
    getAlbum,
    getAlbumById
}