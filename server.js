const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{
    console.log(req.url,req.method);

    //set header content type
    res.setHeader('content-Type','text/html');

    let path = './pages/';
    switch (req.url){
        case '/':
            path+='index.html';
            res.statusCode = 200 ;
            break;
        case '/about':
            path+='about.html';
            res.statusCode = 200 ;
            break;
        case '/about-me':
            
            res.statusCode = 301 ;
            //redirecting to about page
            res.setHeader('Location','/about');
            res.end();
            break;
        default :
            path+='error.html';
            res.statusCode = 404 ;
            break;
    }

    //send an html file
    fs.readFile(path,(err,data)=>{
        if (err){
            console.log(err);
            res.end();
        }else{
            res.end(data);
        }
    })
    
})

server.listen(3000,"localhost",()=>{
    console.log("Listening to the server ...");
});