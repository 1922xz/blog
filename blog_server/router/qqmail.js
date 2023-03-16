const express=require('express')
const router=express.Router()
const qqmail_Handler = require('../router_handler/qqmail.js')
router.get('/users/code',qqmail_Handler.sendMailCode)
module.exports=router