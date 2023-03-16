const path  = require("path")

module.exports={
    devServer:{
        proxy:{
            "/api":{
                target:"http://localhost:3008",
                changeOrigin:true,
                pathRewrite:{
                    "^/api":""
                }
            }
        }
    },
    configureWebpack:{
        resolve:{
            alias:{
                '@':path.resolve(__dirname,'src')
            }
        }
    }
}