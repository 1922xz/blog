const sendCode = require('../config/mail.js')
const { write} = require('../config/fs.js')
const sendMailCode = async (req, res) => {
    const mailInfo = await sendCode(req.query.username).then(resp=>{
        if(!resp.info){
            // console.log(resp,'sssssssssssss');
            res.send({
                data:{
                    flag:false,
                    message:'服务器崩溃'
                }
            })
        }else{
            return resp
        }
    })
    
    // console.log(1);
    const param = {
        // 目前只支持一次给一个邮箱发送验证码
        "qq": mailInfo.info.accepted[0],
        "code": mailInfo.code
    }
    await write(param)
    const data = {}
    data.message = '操作成功',
        data.flag = true
    res.send({ data })
}

module.exports = {
    sendMailCode
}