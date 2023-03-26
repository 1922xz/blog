//使用jwt 来生成或者解密 token

const jwt = require('jsonwebtoken')
const verify = {
    //设置 token
    setToken(name, pwd) {
        return new Promise(resolve => {
            let token = jwt.sign(
                //存储数据，自定义
                { name, pwd },
                //密匙
                '1922xz',
                // 过期时间
                { expiresIn: "10h" }
            )
            resolve(token)
        })
    },
    getToken(token) {
        return new Promise((resolve, reject) => {

            //jwt.verify 里面传入三个参数第一个 token, 第二个 signKey 就是生成token的密匙 第三个 方法 判断； 是否解密成功
            jwt.verify(token, "1922xz", async (err, data) => {
                if (err) {
                    // console.log("请求失败");
                    resolve({
                        state: false,
                        info: "token验证失败"
                    });
                } else {
                    

                }
            });
        })
    }
}
module.exports = verify;