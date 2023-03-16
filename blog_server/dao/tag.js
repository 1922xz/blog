const db = require('../db/index.js')
const getTagsByArticle = (article) => {
    const sql = 'select id,tagName from tb_tag where id in (select tagId from tb_article_tag where articleId=?)'
    return db.execute(sql, article.id)
}
const getTagByTid = (tid) => {
    const sql = 'select * from tb_tag where id=?'
    return db.execute(sql, tid)
}
const getTags = () => {
    const sql = 'select id,tagName from tb_tag'
    return db.execute(sql)
}
const getCount = () => {
    const sql = 'select count(*) as count from tb_tag'
    return db.execute(sql)
}
const getTidbyTname = (Tname) => {
    const sql = 'select id from tb_tag where tagName=?'
    return db.execute(sql, Tname)
}
const addTid_Aid = (obj) => {
    const sql = 'insert into tb_article_tag SET ?'
    return db.execute(sql, obj)
}
const searchTname = (key) => {
    const sql = 'select tagName from tb_tag WHERE tagName LIKE ' + "'%" + key + "%'"
    return db.execute(sql, key)
}
const addTag = (inf) => {
    const sql = 'insert into tb_tag SET ?'
    return db.execute(sql, inf)
}
const getTagInfo=()=>{
    const sql='select * from tb_tag'
    return db.execute(sql)
}
const updateTag=(tag,id)=>{
    const sql='update tb_tag SET? where id='+id
    return db.execute(sql,tag)
}
const deleteTag=(id)=>{

    const sql='delete from tb_tag where id='+id
    return db.execute(sql,id)
}
module.exports = {
    getTagsByArticle,
    getTagByTid,
    getTagByTid,
    getTags,
    getCount,
    getTidbyTname,
    addTid_Aid,
    searchTname,
    addTag,
    getTagInfo,
    updateTag,
    deleteTag
}