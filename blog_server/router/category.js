const express = require('express')
const router = express.Router()
const category_handler = require('../router_handler/category.js')
router.get('/categories', category_handler.getCategorys)


router.get('/admin/categories/search', category_handler.searchByKey)
router.get('/admin/categoryManage',category_handler.getCategoryManage)
router.put('/admin/categoryManage', category_handler.putCategoryManage)
router.delete('/admin/deleteCategory',category_handler.deleteCategory)
module.exports = router