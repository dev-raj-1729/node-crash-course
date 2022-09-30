const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{
    console.log('request made');
    res.setHeader('Content-Type','text/html');
    
    path = './views/index.html';

    fs.readFile(path,(err,data)=>{
        if (err) {
            console.log(err);
            res.end();
        } else {
            res.end(data);
        }
        console.log('Page Send');
    });

});

server.listen(3000,'localhost',()=>{
    console.log('listening for requests on port 3000')
});