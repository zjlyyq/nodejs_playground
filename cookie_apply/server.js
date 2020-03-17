const http = require('http');

const app = http.createServer(function(req, res) {
    res.writeHead(200,{
        'Content-Type': 'text/plain'
    });
    res.write('hello');
    res.end();
})

app.listen(3000)