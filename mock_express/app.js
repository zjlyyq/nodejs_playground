const { response } = require('express');
const  http = require('http');

class Express {
    constructor() {
        this._router = {}
        this._server = http.createServer(function(request, response) {
            let url = request.url;   // /userInfo?name=zjl
            if (url.indexOf('?') != -1) 
                url = url.substring(0, url.indexOf('?'));
            if (this._router[url])
                this._router[url](request, response);
            else 
                response.write('404');
        })
    }

    get(path, handle) {
        this._router[path] = handle;
    }

    post(path, handle) {
        this._router[path] = handle;
    }

    use() {

    }

    listen(port, handle) {
        this._server.listen(port, handle(port));
    }
}

let app = new Express();
app.listen(9999, function(port) {
    console.log(`Server run in port: ${port}`);
})
app.get('videoList', (request, response) => {
    let 
})