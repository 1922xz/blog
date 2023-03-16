const WebSocket = require('ws');
const verify = require('../config/verify.js');
const WebSocketServer = WebSocket.WebSocketServer
const wss = new WebSocketServer({ port: 3006 });
const userDao=require('../dao/user')
wss.on('connection',async (ws,req)=>{
    const myURL = new URL(req.url, "http://localhost:3008")
    //校验token
    console.log(myURL.searchParams.get("token"));
    const payload = await verify.getToken(myURL.searchParams.get("token"))
    console.log(payload);
    if(payload.state){
        ws.user=payload.data.name
        console.log(ws.user);
        let count=1
        wss.clients.forEach(client=>{
            if(client.user!=payload.data.name){
                count++
            }
        })
        ws.send(createMessage(payload.data.name,'欢迎来到聊天室','welcome'))
        // console.log(wss.clients);
        sendAll(count,'number')
    }else{
        ws.send('error')
    }

    ws.on('message',async (data)=>{
        const msgObj=JSON.parse(data)
        // console.log(msgObj);
        let userinfo=await userDao.getUserInfo(msgObj.userId)
        let replyInfo = {
            content: msgObj.content,
            createTime: new Date().toLocaleString('zh', { hour12: false }).replace(/\//g, "-"),
            avatar: userinfo[0].avatar,
            nickName: userinfo[0].nickname,
            email: userinfo[0].email
        }
        // console.log(userinfo);
        sendAll(replyInfo,'replyAll')

    })
    ws.on('close',()=>{
        // console.log(wss.clients);
        // wss.clients.delete(ws.user)
        // console.log(ws.user)
        sendAll(wss.clients.size, 'number')
    })
})
const sendAll=(sendInfo,type)=>{
    wss.clients.forEach(client => {
        if(client.readyState===WebSocket.OPEN){
            client.send(createMessage(null, sendInfo, type), { binary: false })
        }
    })
}
const createMessage=(user,data,type)=>{
    return JSON.stringify({
        user,data,type
    })
}