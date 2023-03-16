const express = require('express')
const router = express.Router()
const article_Handler = require('../router_handler/articles.js')
// 获取文章列表

router.get('/articles', article_Handler.getArticleList)
    // / articles / archives一定要写在上面，因为会被/articles/:id匹配
router.get('/articles/archives', article_Handler.getArtline)
router.get('/articles/search',article_Handler.search)
router.get('/articles/:id',article_Handler.getArticleListById)
router.get('/condition',article_Handler.getCondition)
router.get('/admin/articles/images', article_Handler.uploadArticles)
router.get('/admin/articles/:articleId',article_Handler.getArtByAid)
router.get('/admin/articles',article_Handler.getArtByCondis)
// router.get('/admin/articles/images', article_Handler.uploadArticles)
router.post('/admin/articles',article_Handler.addOrUpdataArt)
router.put('/admin/articles',article_Handler.putArticle)
router.delete('/admin/articles',article_Handler.deleteArticle)
router.put('/admin/articles/top',article_Handler.changeTop)
module.exports = router