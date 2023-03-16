const mysql = require('mysql')

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'blog_database'
})
db.execute = (sql, ...args) => {
    return new Promise((resolve, reject) => {
        db.query(sql, args, (err, result) => {
            if (err) reject(err)
            resolve(result)
        })

    })
}
module.exports = db