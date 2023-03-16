const express = require('express')
const router = express.Router()
const role_Handler = require('../router_handler/role')
router.get('/roles', role_Handler.getRoles)
router.post('/role',role_Handler.updateRoles)

module.exports = router