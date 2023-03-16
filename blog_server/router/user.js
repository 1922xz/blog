const express = require('express')
const router = express.Router()
const register_Handler = require('../router_handler/user')
router.post('/register', register_Handler.register)
router.post('/login', register_Handler.login)
router.put('/forget', register_Handler.forget)

module.exports = router