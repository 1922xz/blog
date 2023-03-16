const tagDao = require('../dao/tag')
const articleDao = require('../dao/article')
const getTags = async (req, res) => {
    const recordList = await tagDao.getTags()
    const count = await tagDao.getCount()
    const data = {
        recordList,
        count: count.count
    }
    res.send({
        data
    })
}
const searchByKey = async (req, res) => {
    const results = await tagDao.searchTname(req.query.keywords)
    res.send({ data: results })
}
const getTagManage = async (req, res) => {
    const taglist = await tagDao.getTagInfo().then(async res => {
        for (let e of res) {
            art = await articleDao.getArtByTid(e.id)
            e.articleCount = art.length
        }
        return res
    })
    res.send({
        data: taglist
    })

}
const addOrUpdateTag = async (req, res) => {
    tag = req.fields
    if (tag.id) {
        let updateTime = new Date().toLocaleString('zh', { hour12: false }).replace(/\//g, "-")
        await tagDao.updateTag({
            tagName: tag.tagName,
            updateTime
        }, tag.id).then(resp => {
            if (resp.affectedRows == 1) {
                res.send({
                    flag: true
                })
            }
        })
    }else{
        createTime = new Date().toLocaleString('zh', { hour12: false }).replace(/\//g, "-")
        await tagDao.addTag({
            createTime,
            tagName:tag.tagName
        }).then(respo=>{
            if(respo.affectedRows==1){
                res.send({
                    flag:true
                })
            }
        })
    }
}
const deleteTags=async (req,res)=>{
    ids = req.fields
    for (let i in ids) {
        await tagDao.deleteTag(ids[i])
    }
    res.send({
        flag: true
    })
}
module.exports = {
    getTags,
    searchByKey,
    getTagManage,
    addOrUpdateTag,
    deleteTags
}