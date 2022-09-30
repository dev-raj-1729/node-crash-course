const http = require('http');

const server = http.createServer((req,res)=>{
    console.log('request made');
    res.setHeader('Content-Type','text/html');
    res.end('<p>Hello World</p>');
});

server.listen(3000,'localhost',()=>{
    console.log('listening for requests on port 3000')
});