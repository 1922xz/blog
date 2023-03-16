const express = require('express')
const router = express.Router()
const comment_handler = require('../router_handler/comment.js')
router.post('/comments',comment_handler.addComment)
router.get('/comments',comment_handler.getComments)
router.get('/comments/reply',comment_handler.getReplyComment)
module.exports = router