//nodemailer.js
const nodemailer = require('nodemailer');/*  */
//创建一个smtp服务器
const config = {
    service: 'qq', // 使用内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 端口
    secureConnection: true, // 使用 SSL
    auth: {
        user: '1922403345@qq.com', //注册的qq邮箱账号
        pass: 'mjmtqkfwksmvbdde' //邮箱的授权码，不是注册时的密码,等你开启的stmp服务自然就会知道了
    }
};
// 创建一个SMTP客户端对象
const transporter = nodemailer.createTransport(config);

// 随机数生成函数
const createSixNum = () => {
    var Num = "";
    for (var i = 0; i < 6; i++) {
        Num += Math.floor(Math.random() * 10);
    }
    return Num;
}
//发送邮件
module.exports = (qqmail) => {
    let mail = {
        // 发件人
        from: '<1922403345@qq.com>',
        // 主题
        subject: 'qq邮箱验证码',//邮箱主题
        // 收件人
        to: qqmail,//前台传过来的邮箱
        // 邮件内容，HTML格式
        text: createSixNum()//发送验证码
    };
    return new Promise((resolve, reject) => {
        transporter.sendMail(mail, function (error, info) {
            // console.log(info);
            resolve({info,code:mail.text})
            reject(error)
        });
    })
};