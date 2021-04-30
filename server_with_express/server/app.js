const path = require('path');
const fs = require('fs');
const express = require("express");
const app = express();
const port = 3001;
const clipboard = require('clipboard');
const boardParse = require('body-parser');
const { off } = require('process');
const shajs = require('sha.js')
const { generatorUnipayweb, new_generatorUnipayweb } = require('./ifsp_unipayweb')
// console.log(clipboard);
app.use(boardParse.urlencoded({extends:true}));
app.get("/", (req, res) => {
    // res.sendFile('C:/Users/tl_zjl/OneDrive/XMind/正则.xmind')
    let hello = '123456';
    hello = shajs('sha512').update(hello).digest('hex');
    res.send(hello);
    // res.send("Hello Express@");
});
app.get('/login', (req, res) => {
    console.log(req.headers.authorization)
    if (req.headers.authorization) {
        const buffer = new Buffer('Tom:123456')
        console.log(buffer.toString('base64'))
        console.log(req.headers.authorization.split(' ')[1])
        if (req.headers.authorization.split(' ')[1] === buffer.toString('base64')) {
            // res.header({'Set-Cookie': 'id="Tom@123456"'})
            res.header({'Set-Cookie': 'id="Tom@123456";age="1"'})
            // res.header({'Set-Cookie': 'age="25"'})
            res.send('Welcome, Tom!');
            return
        }
    }
    res.status(401);
    res.header({'WWW-authenticate': 'Basic realm="Plumbing and Fixtures"'})
    res.send('Login Require');
})
app.get('/login2', (req, res) => {
    console.log(req.headers.authorization)
    if (req.headers.authorization) {
        const buffer = new Buffer('Tom:12345678')
        console.log(buffer.toString('base64'))
        console.log(req.headers.authorization.split(' ')[1])
        if (req.headers.authorization.split(' ')[1] === buffer.toString('base64')) {
            res.send('Welcome, Tom!');
            return
        }
    }
    res.status(401);
    res.header({'WWW-authenticate': 'Basic realm="Plumbing and Fixtures"'})
    res.send('Login Require');
})
app.get("/form_submit", (req, res) => {
    res.send(`<h2>Hello ${formBody.name}, Get 表单提交成功</h2>`);
});
app.post("/form_submit", (req, res) => {
    let formBody = req.body;
    res.send(`<h2>Hello ${formBody.name}, Post 表单提交成功</h2>`);
});
app.put("addFile", (req, res) => {
    // res.sendFile('C:/Users/tl_zjl/OneDrive/XMind/正则.xmind')
    // fs.createWriteStream
    // res.send("Hello Express@");
});
app.post("/transform", (req, res) => {
    console.log(req);
    var result = req.body;
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
        console.log(path.resolve(__dirname, '../'));
        console.log([...path.resolve(__dirname,'../public')].map(e => e === '\\' ? '/':e).join(''))
        res.header("Access-Control-Allow-Origin", "*"); //自定义中间件，设置跨域需要的响应头。
        next();
    },
    express.static([...path.resolve(__dirname,'../public')].map(e => e === '\\' ? '/':e).join(''))
);
app.use(
    "/worker",
    (req, res, next) => {
        console.log(path.resolve(__dirname, '../'));
        console.log([...path.resolve(__dirname,'../../../JavaScript/JavaScriptForWebDevelop/worker/')].map(e => e === '\\' ? '/':e).join(''))
        res.header("Access-Control-Allow-Origin", "*"); //自定义中间件，设置跨域需要的响应头。
        next();
    },
    express.static([...path.resolve(__dirname,'../../../JavaScript/JavaScriptForWebDevelop/worker/')].map(e => e === '\\' ? '/':e).join(''))
);
app.use(
    "/bangbang",
    (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*"); //自定义中间件，设置跨域需要的响应头。
        next();
    },
    express.static("C:/Users/tl_zjl/Documents/TL_CODE/dev-branch/2020/10/PHCS2020-002964泰惠收客户端金融备案检测问题整改/safekeyboard")
);
app.use(
    "/safekeyboard",
    (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*"); //自定义中间件，设置跨域需要的响应头。
        next();
    },
    express.static("C:/Users/tl_zjl/Documents/TL_CODE/dev-branch/2020/10/PHCS2020-002964泰惠收客户端金融备案检测问题整改/safekeyboard")
);
app.use(
    "/face",
    (req, res, next) => {
        console.log('face')
        res.header("Access-Control-Allow-Origin", "*"); //自定义中间件，设置跨域需要的响应头。
        next();
    },
    // express.static("D:/CodeIsMyLife/react_playground")
    // express.static('../react_playground')
    express.static('C:/Users/tl_zjl/Documents/MyCode/JavaScript/MediaStream')
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
    "/blacboard",
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
    // express.static('../react_playground')C:
    // 'C:\Users\tl_zjl\Documents\TL_CODE\dev-branch\2020\09\20200828_享贷商户RCXQ2020-167504'
    express.static('C:/Users/tl_zjl/Documents/TL_CODE/dev-branch/2020/09/20200828_享贷商户RCXQ2020-167504/wallet')
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

app.use('/redirect_unipayweb', async function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //自定义中间件，设置跨域需要的响应头。
    url = await generatorUnipayweb()
    res.redirect(url)
},)

app.use('/redirect_unipayweb', async function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //自定义中间件，设置跨域需要的响应头。
    url = await generatorUnipayweb()
    res.redirect(url)
},)

app.use('/newgeneration', async function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //自定义中间件，设置跨域需要的响应头。
    url = await new_generatorUnipayweb()
    console.log(url)
    res.redirect(url)
},)

app.listen(port, () => {
    console.log(`Example start in port ${port}!`);
});
