const messageDao = require('../dao/message')

const getMessages = async (req, res) => {
    const messages = await messageDao.getMessages()
    res.send({
        data: {
            messages
        }
    })
}

const insertMsg = async (req, res) => {
    let msg = req.fields
    msg.ipAddress = '河南'
    msg.ipSource = '127.0.0.1'
    msg.createTime = new Date().toLocaleString('zh', { hour12: false }).replace(/\//g, "-")
    await messageDao.insertMessage(msg).then(
        resp => {
            if (resp.affectedRows == 1) {
                res.send({ data: { flag: true } })
            }
        }
    )

}

module.exports = {
    getMessages,
    insertMsg
}