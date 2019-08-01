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
        
        //we are rendering the basic HTML without dynamic content first
        fs.readFile(`${__dirname}/templates/template-overview.html`, `utf-8`, (err, data) => {
            //we are looping through to put an undertermined amount of laptops on display
            let overviewOutput = data;
            fs.readFile(`${__dirname}/templates/template-card.html`, `utf-8`, (err, data) => {
                //creating an array of all the HTML strings for each laptop && joining them into one long string
                const cardsOutput = laptopData.map(el => replaceTemplate(data, el)).join("");
                //taking in initial HTML && replacing placeholder with the long string
                overviewOutput = overviewOutput.replace('{%CARDS%}', cardsOutput);
                
                res.end(overviewOutput);
            }); 

        }); 

    }

    else if (pathName === '/laptop' && id < laptopData.length){
        res.writeHead(200, {'Content-type': 'text/html'});
        

        // this is like what template engines do
        fs.readFile(`${__dirname}/templates/template-laptop.html`, `utf-8`, (err, data) => {
            const laptop = laptopData[id];
            const output = replaceTemplate(data, laptop);
            res.end(output);
        }); 


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

function replaceTemplate(origHTML, laptop) {

    let output = origHTML.replace(/{%PRODUCTNAME%}/g, laptop.productName);
    output = output.replace(/{%PRICE%}/g, laptop.price);
    output = output.replace(/{%IMAGE%}/g, laptop.image);
    output = output.replace(/{%SCREEN%}/g, laptop.screen);
    output = output.replace(/{%CPU%}/g, laptop.cpu);
    output = output.replace(/{%STORAGE%}/g, laptop.storage);
    output = output.replace(/{%RAM%}/g, laptop.ram);
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
    output = output.replace(/{%ID%}/g, laptop.id);
    return output;
}