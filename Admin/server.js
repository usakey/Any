
/**
 * Module dependencies: my_ip, express, jade
 */

// we add here all the dependencies
var express = require('express')
	, routes = require('./routes')
	, other_routes = require('./routes/other_routes')
	, http = require('http')
	, path = require('path')
	, myIP = require('my-ip');


// Getting the network configuration (ip address and port):
// * external address: myIP()
// * internal address: myIP(null,true)
var configs={
	ip: [myIP(),myIP(null,true)],// Add this if you are running NODEJS on OPENSHIFT: process.env.OPENSHIFT_NODEJS_IP
	port: 80 || 8080 || 3371 || 3030 //OPENSHIFT's specific port: process.env.OPENSHIFT_NODEJS_PORT
};

//CORS middleware
var allowCrossDomain = function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

		next();
}

// ExpressJS app
var app = express();
app.configure(function(){
	app.set('port', configs.port);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	//app.use(express.logger('dev'));
	//app.use(express.bodyParser());
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(allowCrossDomain);
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

// Configuring the routes
app.get('/', other_routes.index('index'));
var routes_array= ['index','dashboard','login','404','crawler','clustering'];

routes_array.forEach(function(route)
{
	app.get('/'+route, other_routes.index(route));
});

var clusteringController = require('./routes/clustering');
app.get('/clustering_start',clusteringController.run);
app.get('/clustering_stop',clusteringController.stop);
app.get('/clustering_isRunning',clusteringController.isRunning);
app.get('/clustering_logs',clusteringController.sendLogs);


// Error handler: http 404
app.use(other_routes.index('404'));

// Creating the servers (one per ip address)
configs.ip.forEach(function (ip)
{
	http.createServer(app).listen(app.get('port'),ip, function(){
		console.log("Express server["+ip+"] listening on port " + app.get('port'));
	});
});
