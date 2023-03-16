const express = require('express')
const router = express.Router()
const messageHandler = require('../router_handler/message.js')
router.get('/message', messageHandler.getMessages)
router.post('/message',messageHandler.insertMsg)
module.exports = router