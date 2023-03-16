const commentDao = require('../dao/comment')
const userDao = require('../dao/user')
const addComment = (req, res) => {
    let comment = req.fields
    comment.createTime = new Date().toLocaleString('zh', { hour12: false }).replace(/\//g, "-")
    commentDao.addComment(comment).then(resp => {
        if (resp.affectedRows == 1) {
            res.send({
                data: {
                    flag: true
                }
            })
        }
    })

}
const getComments = async (req, res) => {
    console.log(req.query);
    const { current, type, topicId } = req.query
    let count=await commentDao.getCommentCount(type,topicId)
    let commentList = await commentDao.getparentComments(current, type, topicId)
    for (let i of commentList) {
        let replyComment = await commentDao.getReplyComment(type, topicId,i.id)
        let replyCommentCount = await commentDao.getReplyCommentCount(type, topicId, i.id)
        // console.log(replyCommentCount);
        let userinfo = await userDao.getUserInfo(i.userId)
        let info = userinfo[0]
        for (let j of replyComment){
            j.replyUserName =await userDao.getUserInfo(j.replyUserId).then(res=>{
                if(res){
                    // console.log(res[0].nickname);
                    return res[0].nickname
                }
            })
            let replyUserInfo=await userDao.getUserInfo(j.userId)
            replyUserInfo=replyUserInfo[0]
            for (let attr in replyUserInfo) {
                if (attr == 'id') { continue; }
                j[attr] = replyUserInfo[attr]
            }
        }
        
        for(let attr in info){
            if (attr == 'id') { continue; }
            i[attr]=info[attr]
        }
        i.replyComment=replyComment
        
        i.replyCommentCount=replyCommentCount[0].count
    }
    if(current>1){
        // console.log(commentList);
    }
    res.send({
        data: {
            commentList,
            count:count[0].count
        }
    })
}
const getReplyComment = async (req, res) => {
    let query = req.query
    let replyCommentList=await commentDao.getReplyCommentByCurrent(query.id,query.current).then(async resp=>{
        for (let i of resp){
            let userinfo=await userDao.getUserInfo(i.userId)
            userinfo=userinfo[0]
            for (let attr in userinfo) {
                if (attr == 'id') { continue; }
                i[attr] = userinfo[attr]
            }
            i.replyUserName = await userDao.getUserInfo(i.replyUserId).then(respo => {
                if (respo) {
                    // console.log(res[0].nickname);
                    return respo[0].nickname
                }
            })
        }
        return resp
    })
    console.log(replyCommentList);
    res.send({
        data: {
            replyCommentList
        }
    })
}
module.exports = {
    addComment,
    getComments,
    getReplyComment
}