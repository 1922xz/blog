const express=require('express')
const router=express.Router()
const album_Handler = require('../router_handler/album.js')

router.get('/album',album_Handler.getAlbum)

module.exports=router