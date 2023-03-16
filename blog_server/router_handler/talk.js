const talkDao = require('../dao/talk')
const userDao = require('../dao/user')
const commentDao=require('../dao/comment.js')
const getTalks = async (req, res) => {
    let query = req.query
    const { current, size, status, id } = query
    console.log(req);
    const count = await talkDao.getCount()
    const userinfo = await userDao.getNinameAndAvatar()
    const recordList = await talkDao.getTalks(current, size, status, id).then(async (data, talks = []) => {
        for (let e of data) {
            let commentCount=await commentDao.getCommentCount(3,e.id)
            e.commentCount=commentCount[0].count
            e.nickname = userinfo[0].nickname
            e.avatar = userinfo[0].avatar
            // console.log(e);
            if (e.images) {
                e.images = JSON.parse(e.images)
            }
            talks.push(e)
        }
        return talks
    })

    const data = {
        count: count[0].count,
        recordList
    }
    res.send({ data })
}

const addTalks = async (req, res) => {
    let fields = req.fields
    if(fields.id){
        await talkDao.updateTalks(fields).then(resp => {
            console.log(resp);
            if (resp.affectedRows == 1) {
                res.send({
                    flag: true
                })
            }
        })
    }else{
        fields.likeCount = 0
        fields.userId = 1
        fields.createTime = new Date().toLocaleString('zh', { hour12: false }).replace(/\//g, "-")
        await talkDao.addTalks(fields).then(resp => {
            if (resp.affectedRows == 1) {
                res.send({
                    flag: true
                })
            }
        })
    }
}
const deleteTalks=async (req,res)=>{
    let id=req.fields.talkId
    let result=await talkDao.deleteTalks(id)
    if(result.affectedRows==1){
        res.send({
            flag:true
        })
    }
}
const getTalksById=async (req,res)=>{
    let talkId=req.params.talkId
    const userinfo = await userDao.getNinameAndAvatar()
    talkDao.getTalks(undefined,undefined,undefined,talkId).then(async (data) => {
        for (let e of data) {
            let commentCount = await commentDao.getCommentCount(3, e.id)
            e.commentCount = commentCount[0].count
            e.nickname = userinfo[0].nickname
            e.avatar = userinfo[0].avatar
            if (e.images) {
                e.images = JSON.parse(e.images)
            }
        }
        console.log(data);
        res.send({
            data
        })
    })
}
module.exports = { getTalks, addTalks, deleteTalks, getTalksById }