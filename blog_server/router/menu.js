const express=require('express')
const router=express.Router()
const menu_Handler=require('../router_handler/menu')
// router.get('/user/menus',menu_Handler.getMenus)
router.get('/user/menus', menu_Handler.getUserMenus)
router.get('/menus',menu_Handler.getMenuList)
router.put('/menu', menu_Handler.updateMenu)
module.exports=router