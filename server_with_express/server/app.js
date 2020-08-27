const path = require('path');
const express = require("express");
const app = express();
const port = 3001;
const clipboard = require('clipboard');
const boardParse = require('body-parser');
const { off } = require('process');
// console.log(clipboard);
app.use(boardParse.urlencoded({extends:true}));
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.post("/transform", (req, res) => {
    var result = req.body
    // console.log()
    let url = result.url;
    url = url.replace('https', "http")
    url = url.replace('pay', "tppdev")
    // 小微
    if (url.includes('billcloud')) {
        let offset = url.split('qrCode')[1];
        url = "http://tppdev.zjtlcb.com/ifsp-payweb/merUnionPayReceive?qrCode" + offset;
    }
    if (result.which === "huigui") {
        url = url.replace('ifsp-payweb', "ifsp-payweb-huigui")
    }else if(result.which === "kf") {
        url = url.replace('ifsp-payweb', "ifsp-payweb-kf")
    }else {
        url = url.replace('ifsp-payweb', "ifsp-payweb-ceshi")
    }
    
    res.redirect(url);
});
// app.get("/payweb", (req, res) => {
//     express.static('../public')
// });
app.use(
    "/payweb",
    (req, res, next) => {
        console.log('payweb')
        console.log(path.resolve(__dirname, '../'));
        console.log([...path.resolve(__dirname + '../public')].map(e => e === '\\' ? '/':e).join(''))
        res.header("Access-Control-Allow-Origin", "*"); //自定义中间件，设置跨域需要的响应头。
        next();
    },
    // express.static("D:/CodeIsMyLife/react_playground")
    // express.static('../react_playground')
    
    express.static(path.resolve(__dirname, '../'))
    // C:\Users\tl_zjl\Documents\MyCode\nodejs_playground\server_with_express\server\public
    // C:/Users/tl_zjl/Documents/MyCode/nodejs_playground/server_with_express/server/public
    // express.static('C:/Users/tl_zjl/Documents/MyCode/nodejs_playground/server_with_express/public')
);
app.use(
    "/react",
    (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*"); //自定义中间件，设置跨域需要的响应头。
        next();
    },
    // express.static("D:/CodeIsMyLife/react_playground")
    // express.static('../react_playground')
    express.static('C:/Users/zjl/Documents/mycode/react_playground')
);
app.use(
    "/tl",
    (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*"); //自定义中间件，设置跨域需要的响应头。
        next();
    },
    // express.static("D:/CodeIsMyLife/react_playground")
    // express.static('../react_playground')
    express.static('/media/zjlyyq/AC0CDF290CDEED78/Users/tl_zjl/Documents/TL_CODE/dev-branch/多收多贷需求RCXQ2020-110001')
);
app.use(
    "/es_basic",
    (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*"); //自定义中间件，设置跨域需要的响应头。
        next();
    },
    // express.static("D:/CodeIsMyLife/react_playground")
    // express.static('../react_playground')
    express.static('C:/Users/tl_zjl/Documents/MyCode/es_basic')
);

app.use("/root", 
(req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); //自定义中间件，设置跨域需要的响应头。
    next();
},
express.static("public"));

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
