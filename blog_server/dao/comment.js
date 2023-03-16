const db = require('../db/index.js')
const addComment = (comment) => {
    console.log(comment);
    const sql = 'insert into tb_comment SET ?'
    return db.execute(sql, comment)
}
const getparentComments=(current,type,topicId)=>{
    const sql = 'select * from tb_comment where type=' + type + ' and topicId=' + topicId +' and parentId is NULL and replyUserId is NULL ORDER BY id DESC limit '+(current-1)*8+',8'
    return db.execute(sql)
}
const getCommentCount=(type,topicId)=>{
    const sql = 'select count(*) as count from tb_comment where type=' + type + ' and topicId=' + topicId
    return db.execute(sql)
}
const getReplyComment = (type, topicId, parentId, current = 1)=>{
    // console.log(type, topicId, current, parentId);
    const sql = 'select * from tb_comment where type=' + type + ' and topicId=' + topicId + ' and parentId='+parentId +' ORDER BY id DESC limit ' + (current - 1) * 4 +',4'
    return db.execute(sql)
}
const getReplyCommentByCurrent=(parentId,current)=>{
    const sql = 'select * from tb_comment where parentId=' + parentId + ' ORDER BY id DESC limit ' + (current - 1) * 8 + ',8'
    return db.execute(sql)
}
const getReplyCommentCount = (type, topicId, parentId)=>{
    const sql = 'select count(*) as count from tb_comment where type=' + type + ' and topicId=' + topicId +  ' and parentId=' + parentId
    return db.execute(sql)
}
module.exports={
    addComment,
    getparentComments,
    getCommentCount,
    getReplyComment,
    getReplyCommentCount,
    getReplyCommentByCurrent
}