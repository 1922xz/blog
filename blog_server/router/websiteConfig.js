const express = require('express')
const router = express.Router()
const websiteConfig_Handler = require('../router_handler/websiteConfig.js')
router.get('/websiteConfig', websiteConfig_Handler.getWebsiteConfig)

module.exports = router