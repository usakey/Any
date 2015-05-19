/*
* Sert à faire tourner le clustering independamment du siteweb
*/

var express = require('express'),
http = require('http'),
fs= require('fs'),
myIP = require('my-ip'),
clusteringController = require('./routes/clustering');


var app = express();
app.configure(function(){
	app.set('port', 8080);
	app.use(app.router);
});

app.get('/clustering_start',clusteringController.run);
app.get('/clustering_stop',clusteringController.stop);
app.get('/clustering_isRunning',clusteringController.isRunning);
app.get('/clustering_logs',clusteringController.sendLogs);


http.createServer(app).listen(app.get('port'),myIP(), function(){
	console.log("Express server"+myIP()+" listening on port " + app.get('port'));
});

