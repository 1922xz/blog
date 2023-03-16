//config.js

const qiniu = require('qiniu')

// 创建上传凭证
const accessKey = 'DOJ3DZblqzRngh_tq-Z5XW7jhvOb7HgkvpwQH_ow'    //accessKey 
const secretKey = 'VFsVoA3tQ7QTyjmyKR5SdnhbawMtg351KSveo6-S'    //secretKey 
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const options = {
    scope: 'blogserve',         //对象存储空间名字
    expires: 72000
}
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)

module.exports = {
    uploadToken
}