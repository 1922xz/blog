const articleDao = require('../dao/article.js')
const categoryDao = require('../dao/category.js')
const tagDao = require('../dao/tag.js')
const setArtTags = async (e) => {
    const tagDTOList = await tagDao.getTagsByArticle(e)
    if (tagDTOList instanceof Array) {
        return tagDTOList
    }
    return [tagDTOList]

}
const getArticleList = async (req, res) => {
    const currentPage = req.query.current
    const article = await articleDao.getArticleList(currentPage)
    const dealArticle = []
    for (let e of article) {
        const { userId, originalUrl, isDelete, status, ...art } = e
        const category = await categoryDao.getCategoryByArticle(e)
        art.categoryName = category.categoryName
        art.tagDTOList = await setArtTags(e)
        dealArticle.push(art)
    }
    res.send({
        data: dealArticle
    })

}
const getArticleListById = async (req, res) => {
    const id = Number(req.params.id);
    const lastArticle = await articleDao.getLastArticle(id);   // 找到上一篇文章
    const nextArticle = await articleDao.getNextArticle(id);   // 找到下一篇文章
    const article = await articleDao.getArticleListById(id);   // 根据id找这篇文章
    if(!article[0]){
        return res.send({})
    }
    const categoryName = await categoryDao.getCategoryByArticle(article[0]);     // 找到该文章分类名称
    const recommendArticleList = await articleDao.getRecommendArticleByArt(article[0]);     // 找到推荐文章
    const newestArticleList = await articleDao.getNewistArticle();     // 找到最新文章
    const tagDTOList = await tagDao.getTagsByArticle(article[0]) //找到文章标签
    res.send({
        data: {
            lastArticle: lastArticle[0],
            nextArticle: nextArticle[0],
            categoryName: categoryName[0].categoryName,
            newestArticleList,
            recommendArticleList,
            tagDTOList,
            ...article[0]
        }
    })
}
const getArtline = async (req, res) => {
    const current = req.query.current
    const recordList = await articleDao.getArtTimeline(current);
    await articleDao.getArtCount().then((result, data = {}) => {
        [data.recordList, data.count] = [recordList, result[0].count]
        res.send({
            data
        })
    })

}
const getCondition = async (req, res) => {
    let name = ""
    const [cid, tid, articlePreviewDTOList] = [req.query.categoryId, req.query.tagId, []]
    if (tid) {
        const tag = await tagDao.getTagByTid(tid)
        const artByT = await articleDao.getArtByTid(tid)
        for (const e of artByT) {
            const c = await categoryDao.getCategoryByArticle(e)
            e.categoryName = c.categoryName
            const a = await setArtTags(e)
            e.tagDTOList = a
            articlePreviewDTOList.push(e)
        }
        name = tag[0].tagName

    } else {
        const arts = await articleDao.getArtByCid(cid)
        const categoryName = await categoryDao.getCname(cid)
        for (const e of arts) {
            e.categoryName = categoryName[0].categoryName
            e.tagDTOList = await setArtTags(e)
            articlePreviewDTOList.push(e)
        }
        name = categoryName[0].categoryName
    }
    const data = {
        articlePreviewDTOList,
        name
    }
    res.send({ data })
}

const search = async (req, res) => {
    let key = req.query.keywords
    const result = await articleDao.searchByKey('%' + key + '%')
    res.send({
        data: result
    })
}
const getArtByCondis = async (req, res) => {
    const query = req.query
    let arr = []
    if (query.tagId) {
        let articleIds = await articleDao.getArtIdsByTid(query.tagId).then(res => {
            return res.map(item => {
                return item.articleId
            })
        })
        arr.push(`id in (${articleIds})`)
    }
    if (query.keywords) {
        arr.push(`articleTitle like '%${query.keywords}%'`)
    }
    const { current, size, tagId, keywords, ...condit } = { ...query }
    for (let i in condit) {
        var str = i + "=" + query[i]
        arr.push(str)
    }
    const SQL = arr.join(" and ")
    console.log(SQL);
    const arts = await articleDao.getArtBycondit(SQL)
    for (let a of arts) {

        const category = await categoryDao.getCategoryByArticle(a)
        if (category[0]) {
            a.categoryName = category[0].categoryName
        }
        a.tagDTOList = await setArtTags(a)
    }
    res.send({ data: arts })
}
const qnconfig = require('../config/qiniu')

const uploadArticles = async (req, res) => {
    const token = await qnconfig.uploadToken
    res.send({
        status: 1,
        message: '上传凭证获取成功',
        upToken: token,
    })

}

const addOrUpdataArt = async (req, res) => {
    const params = req.fields
    console.log(params);
    if (params.status === 3) {
        const { tagNameList, categoryName, id, ...artdraft } = {
            ...params,
            createTime: new Date().toLocaleString('zh', { hour12: false }).replace(/\//g, "-")
        }
        const resultDraft = await articleDao.addOrUpdArt(artdraft)
        if (resultDraft.affectedRows === 1) {
            return res.send({ flag: true })
        }
    }
    let categoryId = await categoryDao.getCidByName(params.categoryName).then(async res => {
        if (!res[0]) {
            let addCategoryRes = await categoryDao.addCategory({
                categoryName: params.categoryName,
                createTime: new Date().toLocaleString('zh', { hour12: false }).replace(/\//g, "-")
            })
            return addCategoryRes.insertId
        } else {
            return res[0].id
        }
    })
    // let categoryId
    const { tagNameList, categoryName, id, ...art } = {
        ...params,
        categoryId,
        createTime: new Date().toLocaleString('zh', { hour12: false }).replace(/\//g, "-")
    }

    const artresp = await articleDao.addOrUpdArt(art,params.id)
    if (artresp.affectedRows === 1) {
        for (let i of params.tagNameList) {
            const tagresp = await tagDao.getTidbyTname(i)
            let tagId
            if (!tagresp[0]) {
                const addTagResp = await tagDao.addTag({
                    tagName: i,
                    createTime: new Date().toLocaleString('zh', { hour12: false }).replace(/\//g, "-")
                })
                tagId = addTagResp.insertId
            } else {
                tagId = tagresp[0].id
            }
            await tagDao.addTid_Aid({
                articleId: artresp.insertId || params.id,
                tagId
            })
        }
    }

    res.send({
        flag: true
    })
}

const putArticle = async (req, res) => {
    const { idList, ...set } = req.fields
    await articleDao.updateOrDeleteArt(set, idList).then(resp => {
        if (resp.affectedRows >= 1) {
            const message = req.fields.isDelete === 0 ? '恢复成功' : '删除成功'
            return res.send({
                flag: true,
                data: {
                    message
                }
            })
        }

    })
}
const deleteArticle = async (req, res) => {
    // console.log(req.fields.idList);
    await articleDao.deleteArticle(req.fields.idList).then(resp => {
        if (resp.affectedRows >= 1) {
            res.send({
                flag: true,
                data: {
                    message: '彻底删除成功'
                }
            })
        }
    })
}
const changeTop = async (req, res) => {
    const field = req.fields
    await articleDao.changeTop(field).then(resp => {
        if (resp.affectedRows === 1) {
            return res.send({
                flag: true,
                data: {
                    message: field.isTop === 1 ? '置顶成功' : '取消置顶'
                }
            })
        }
    })
}
const getArtByAid = async (req, res) => {
    const id = req.params.articleId
    const data = await articleDao.getArtByAid(id).then(async resp => {
        if (resp[0]) {
            const categoryName = await categoryDao.getCategoryByArticle(resp[0])
            const tagDTOList = await setArtTags(resp[0])
            return {
                categoryName: categoryName[0].categoryName,
                tagNameList: tagDTOList.map(e => {
                    return e['tagName']
                }),
                ...resp[0],
                categoryId: undefined
            }
        }
    })
    res.send({
        data
    })
}
module.exports = {
    getArticleList,
    getArticleListById,
    getArtline,
    getCondition,
    search,
    getArtByCondis,
    uploadArticles,
    addOrUpdataArt,
    putArticle,
    deleteArticle,
    changeTop,
    getArtByAid
}