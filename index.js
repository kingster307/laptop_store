const   fs      = require('fs'),
        http    = require('http'),
        url     = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const laptopData = JSON.parse(json);

//this is run each time someome accesses our web server 
const server = http.createServer((req, res) => {

    const pathName = url.parse(req.url, true).pathname;
    const id = url.parse(req.url, true).query.id;


    if(pathName === "/products" || pathName === "/"){
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(`this is the ${pathName} page for laptop ${id}`);
    }

    else if (pathName === '/laptop' && (id < laptopData.length || id === undefined)){
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(`this is the ${pathName} page`);
    }

    //notice the use of 404
    else{
        res.writeHead(404, {'Content-type': 'text/html'});
        res.end(`URL not found on the server`);
    } 

    console.log(id);
    console.log(pathName);
    console.log("someOne did acess the server");
    // res.write("<h1>Hello</h1>");
    // res.body.write 
    
});

server.listen(1337, '127.0.0.1', () => {
    console.log('listening for requests');
});