const express = require('express')
const router = express.Router()
const tag_Handler = require('../router_handler/tag')
router.get('/tags', tag_Handler.getTags)
router.get('/admin/tags/search', tag_Handler.searchByKey)
router.get('/admin/getTagManage', tag_Handler.getTagManage)
router.put('/admin/putTag',tag_Handler.addOrUpdateTag)
router.delete('/admin/deletetags',tag_Handler.deleteTags)
module.exports = router