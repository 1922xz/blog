const db = require('../db/index.js')
const getWebsiteConfig = () => {
    const sql = 'select * from tb_websiteConfig'
    return db.execute(sql)
}
module.exports={
    getWebsiteConfig
}