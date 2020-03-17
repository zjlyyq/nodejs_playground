const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
app.use('/cookie', function(req, res, next) {
    console.log(req.cookies)
    // if (!req.cookies){
        res.cookie('zjl',20)
    // }
    res.send('hello express')
})
app.listen(3000)

console.log('express start!!!')