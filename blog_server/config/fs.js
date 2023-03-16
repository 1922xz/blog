const fs = require('fs')
let path = require('path')
// node默认读取文件路径是这个项目启动的那个文件，这里改路径
const mail_path = path.resolve(__dirname, '../cache/mail.json')
const myreadFile = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(mail_path, "utf8", (err, data) => {
            if (err) {
                reject(err)
            }
            resolve(data)
        })
    })
}
const mywriteFile = (str) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(mail_path, str, (err) => {
            resolve(true)
            reject(err)
        })
    })
}
const myTimeout = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        }, 1000*60)
    })
}
const write = (param) => {
    myreadFile().then(data => {
        var code = JSON.parse(data)
        console.log(code);
        let index=code.findIndex(e=>{
            return e.qq===param.qq
        })
        console.log(index);
        if(index!=-1){
            code[index].code=param.code
        }else{
            code.push(param)
        }
        var str = JSON.stringify(code)
        mywriteFile(str).then(res => {
            if (res) {
                myTimeout().then(res => {
                    if (res) {
                        delet(param.qq)
                    }
                })
            }
        })
    })
}
const delet = (qq) => {
    myreadFile().then((data) => {
        var code = JSON.parse(data)
        for (let i in code) {
            if (code[i]["qq"] == qq) {
                code.splice(i, 1)
            }
        }
        var str = JSON.stringify(code)
        mywriteFile(str)
    })
}
const findCode=(qq)=>{
    let result=myreadFile().then((data)=>{
        var arr=JSON.parse(data)
        for(let i in arr){
            if(arr[i]["qq"]===qq){
                return arr[i]
            }
        }
        return {}
    })
    return result
}
module.exports = {
    write, delet,findCode
}