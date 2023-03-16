const db = require('../db/index.js')
const getArticleList = (current) => {
    const sql = 'select * from tb_article limit ?,5'
    const start = (current - 1) * 5
    return db.execute(sql, start)
}
const getLastArticle = (id) => {
    const sql = "select id, articleCover, articleTitle from tb_article where id < ? ORDER BY id DESC LIMIT 1";
    return db.execute(sql, id)
}
const getNextArticle = (id) => {
    const sql = "select id, articleCover, articleTitle from tb_article where id > ? ORDER BY id LIMIT 1;";
    return db.execute(sql, id)
}
const getArticleListById = (id) => {
    const sql = 'select * from tb_article where id=?'
    return db.execute(sql, id)
}
const getNewistArticle = () => {
    const sql = 'select id, articleCover, articleTitle,createTime from tb_article order by createTime desc limit 0,5'
    return db.execute(sql)
}
const getRecommendArticleByArt = (article) => {
    const sql = 'select id, articleCover, articleTitle,createTime from tb_article where categoryId=? and id <> ?'
    return db.execute(sql, article.categoryId, article.id)
}
const getArtTimeline = (current) => {
    const sql = 'select id,articleTitle,createTime from tb_article order by createTime DESC limit ?,10'
    return db.execute(sql, (current - 1) * 10)
}
const getArtCount = () => {
    const sql = 'select count(*) as count from tb_article'
    return db.execute(sql)
}

const getArtByCid = (cid = 0) => {
    const sql = 'select id,articleCover,articleTitle,createTime,categoryId from tb_article where categoryId=?'
    return db.execute(sql, cid)
}
const getArtByTid = (tid = 0) => {
    const sql = 'select id,articleCover,articleTitle,createTime,categoryId from tb_article where id in (select articleId from tb_article_tag where tagId=?)'
    return db.execute(sql, tid)
}

const searchByKey = (key) => {
    const sql = 'select articleTitle,articleContent,id from tb_article where articleContent LIKE ?'
    return db.execute(sql, key)
}
const getArtBycondit = (sql) => {
    const SQL = 'select * from tb_article where ' + sql
    return db.execute(SQL)
}
const addOrUpdArt = (art,artId) => {
    const sql = artId ?'update tb_article SET ? where id='+artId: 'insert into tb_article SET ?'
    return db.execute(sql, art)
}
const getArtIdsByTid = (tid) => {
    const sql = 'select articleId from tb_article_tag where tagId = ?'
    return db.execute(sql, tid)
}
const updateOrDeleteArt = (set, condition) => {
    const sql = 'update tb_article SET ? where id in ' + `(${condition})`
    return db.execute(sql, set)
}
const deleteArticle = (idList) => {
    const sql = 'delete from tb_article  where id in ' + `(${idList})`
    return db.execute(sql, idList)
}
const changeTop = (obj) => {
    const sql = 'update tb_article set isTop = ? where id=?'
    return db.execute(sql, obj.isTop, obj.id)
}

const getArtByAid = (id) => {
    const sql = 'select id,articleTitle,articleContent,articleCover,categoryId,originalUrl,isTop,type,status from tb_article where id = ?'
    return db.execute(sql, id)
}
module.exports = {
    getArticleList,
    getLastArticle,
    getNextArticle,
    getArticleListById,
    getNewistArticle,
    getRecommendArticleByArt,
    getArtTimeline,
    getArtCount,
    getArtByCid,
    getArtByTid,
    searchByKey,
    getArtBycondit,
    addOrUpdArt,
    getArtIdsByTid,
    updateOrDeleteArt,
    deleteArticle,
    changeTop,
    getArtByAid
}