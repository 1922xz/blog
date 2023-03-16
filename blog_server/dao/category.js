const db = require('../db/index.js')
const getCategoryByArticle = (article) => {
    const sql = 'select categoryName from tb_category where id=?'
    return db.execute(sql, article.categoryId)
}
const getCategoryCount = () => {
    const sql = 'select count(*) as count from tb_category'
    return db.execute(sql)
}
const getCidAndArcCount = () => {
    const sql = 'select count(*) as articleCount,categoryId from tb_article GROUP BY categoryId'
    return db.execute(sql)
}
const getCname = (id) => {
    const sql = id ? 'select id,categoryName from tb_category where id=?' : 'select id,categoryName from tb_category'
    return db.execute(sql, id)
}
const getCidByName = (cname) => {
    const sql = 'select id from tb_category where categoryName=?'
    return db.execute(sql, cname)
}
const searchCname = (key) => {
    const sql = 'select categoryName from tb_category WHERE categoryName LIKE ' + "'%" + key + "%'"
    return db.execute(sql, key)
}
const addCategory = (inf) => {
    const sql = 'insert into tb_category SET ?'
    return db.execute(sql, inf)
}
const getCategoryInfo=()=>{
    const sql='select * from tb_category'
    return db.execute(sql)
}
const updateCategory=(category,id)=>{
    const sql='update tb_category SET ? where id='+id
    return db.execute(sql,category)
}
const deleteCategory = (id) => {
    console.log(id);
    const sql = 'delete from tb_category where id=' + id
    return db.execute(sql)
}
module.exports = {
    getCategoryByArticle,
    getCategoryCount,
    getCidAndArcCount,
    getCname,
    getCidByName,
    searchCname,
    addCategory,
    getCategoryInfo,
    updateCategory,
    deleteCategory
}