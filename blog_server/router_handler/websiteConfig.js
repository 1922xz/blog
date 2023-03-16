const websiteDao = require('../dao/websiteConfig.js')
const articleDao = require('../dao/article.js')
const categoryDao = require('../dao/category.js')
const tagDao = require('../dao/tag.js')
const getWebsiteConfig = async (req, res) => {
    console.log(req.path,'path');
    const data=await websiteDao.getWebsiteConfig().then(async (resp)=>{
        resp=resp[0]
        console.log(resp);
        let articleCount=await articleDao.getArtCount()
        let typeCount=await categoryDao.getCategoryCount()
        let tagCount=await tagDao.getCount()
        resp.articleCount = articleCount[0].count
        resp.categoryCount = typeCount[0].count
        resp.tagCount = tagCount[0].count
        return resp
    })
    res.send({data})
}

module.exports = { getWebsiteConfig }