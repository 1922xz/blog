const express = require('express')
const router = express.Router()
const talk_Handler = require('../router_handler/talk')
router.get('/talks', talk_Handler.getTalks)
router.get('/talks/:talkId', talk_Handler.getTalksById)

router.post('/admin/talks',talk_Handler.addTalks)
router.delete('/admin/talks', talk_Handler.deleteTalks)
module.exports = router