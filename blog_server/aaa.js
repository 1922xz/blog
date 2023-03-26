const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.get('/send', function (req, res) {
    var transporter = nodemailer.createTransport({
        service: 'qq',
        auth: {
            user: '1922403345@qq.com',
            pass: 'qdcsbcgpgwtedfag'
        }
    });

    var mailOptions = {
        from: '1922403345@qq.com',
        to: '3534378377@qq.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send('error');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('sent');
        }
    });
});

app.listen(3000, function () {
    console.log('Server started on port 3000...');
});