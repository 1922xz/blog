const categoryDao = require('../dao/category')
const articleDao=require('../dao/article')
const getCategorys = async (req, res) => {
    const cAa = await categoryDao.getCidAndArcCount()
    const cName = await categoryDao.getCname()
    const recordList = []
    for (const b of cName) {
        const temp = {
            articleCount: 0,
            id: b.id,
            categoryName: b.categoryName
        }
        for (const a of cAa) {
            if (a.categoryId == b.id) {
                [temp.articleCount, temp.id, temp.categoryName] = [a.articleCount, a.categoryId, b.categoryName]
                break
            }
        }

        recordList.push(temp)
    }
    const count = await categoryDao.getCategoryCount()
    data = {
        recordList,
        count: count[0].count
    }
    res.send({
        data
    })
}

const searchByKey = async (req, res) => {
    const results = await categoryDao.searchCname(req.query.keywords)
    res.send({ data: results })
}
const getCategoryManage=async (req,res)=>{
    const results=await categoryDao.getCategoryInfo().then(async res=>{
        for (let e of res){
            articlelist= await articleDao.getArtByCid(e.id)
            e.articleCount=articlelist.length
        }
        return res
    })
    res.send({
        data:results
    })
}
const putCategoryManage=async (req,res)=>{
    reqData=req.fields
    if(reqData.id){
        let updateTime = new Date().toLocaleString('zh', { hour12: false }).replace(/\//g, "-")
        await categoryDao.updateCategory({
            categoryName:reqData.categoryName,
            updateTime,
        },reqData.id).then(respon=>{
            if (respon.affectedRows === 1) {
                res.send({
                    success: true
                })
            }
        })
    }else{
        let createTime =new Date().toLocaleString('zh', { hour12: false }).replace(/\//g, "-")
        let updateTime=null
        let categoryName=reqData.categoryName
        await categoryDao.addCategory({
            categoryName,
            createTime,
            updateTime
        }).then(resp=>{
            if (resp.affectedRows===1){
                res.send({
                    success:true
                })
            }
        })
    }
}
const deleteCategory=async (req,res)=>{
    id=req.fields.id
    for(let i in id){
        await categoryDao.deleteCategory(id[i])
    }
    res.send({
        flag:true
    })
}
module.exports = {
    getCategorys,
    searchByKey,
    getCategoryManage,
    putCategoryManage,
    deleteCategory
}