const path = require('path');
const express = require("express");
const app = express();
const port = 3001;
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use(
    "/react",
    (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*"); //自定义中间件，设置跨域需要的响应头。
        next();
    },
    // express.static("D:/CodeIsMyLife/react_playground")
    express.static('/Users/jialuzhang/MyCode/react_playground')
    // express.static('C:/Users/zjl/Documents/mycode/react_playground')
);

app.use("/root", 
(req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); //自定义中间件，设置跨域需要的响应头。
    next();
},
express.static("public"));


app.get("/videoList", 
(req, res) => {
    res.header("Access-Control-Allow-Origin", "*"); //自定义中间件，设置跨域需要的响应头。
    res.send('viedeoList');
});
// app.use(function(req, res, next) {
//     res.status(404).send("Sorry can't find that!");
// });

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

app.listen(port, () => {
    console.log(`Example start in port ${port}!`);
});
