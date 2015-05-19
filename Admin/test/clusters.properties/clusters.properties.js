/*
* Reçois le nouveau ficher clusters.properties
*/

var express = require('express'),
http = require('http'),
fs= require('fs'),
myIP = require('my-ip');

var test = function(req, res, next) {
	console.log('fichier reçu');
	next();
}

var app = express();
app.configure(function(){
	app.set('port', 8181);
	app.use(test);
	//app.use(express.bodyParser());
	
	app.use (function(req, res, next) {
    var data='';

    req.setEncoding('utf8');
    req.on('data', function(chunk) { 
       data += chunk;
    });

    req.on('end', function() {
        req.body = data;
        next();
    });
});
	app.use(app.router);
});

var writingFile= false;

function dummy(req,resp)
{
	console.log('OK');
  if(writingFile==false){
    writingFile=true;
    fs.writeFile('clusters.properties', req.body,function(){
      writingFile=false;
    });
  }
  resp.status(200).set({'Content-Type': 'text/plain'}).send('merci :)');
};

app.put('/update',dummy);


http.createServer(app).listen(app.get('port'),myIP(), function(){
	console.log("Express server"+myIP()+" listening on port " + app.get('port'));
});
