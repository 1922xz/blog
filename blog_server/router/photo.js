const express=require('express')
const router=express.Router()
const photo_Handler=require('../router_handler/photo.js')
router.get('/photos/:id',photo_Handler.getPhotoCoverList)
module.exports=router