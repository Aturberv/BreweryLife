var static = require('node-static');
var http = require('http');

var file = new static.Server('./build');

http.createServer(function (request, response) {
    request.addListener('end', function () {   
        if(/\..*$/.test(request.url)){
            file.serve(request, response);    
        } else {
            file.serveFile('index.html', 200, {}, request, response);
        }        
    }).resume();
}).listen(8080);
