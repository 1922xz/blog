const express = require('express')
const formidable = require('formidable');
const router = express.Router()

router.post('/users/avatar', (req, res) => {
    var form = new formidable.IncomingForm();
    form.uploadDir = "C:\\Users\\1922xz\\Desktop\\练习\\blog_server\\uploads"
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
        }
        console.log(files.file.path);
        res.send({
            data: {
                avatar: 0
            }
        })
    });
})
router.get('/updateInfo',(req,res)=>{
    res.send({
        data:1
    })
})

module.exports=router