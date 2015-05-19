
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , main = require('./routes/main')
  , user = require('./routes/user')
  , searchresult = require('./routes/searchresult')
  , http = require('http')
  , path = require('path');

var app = express();

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
}


app.configure(function(){
  app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(allowCrossDomain);
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/main', main.index);
app.get('/users', user.list);

app.post('/search', searchresult.process);
app.options('/search',  searchresult.process);

http.createServer(app).listen(app.get('port'),process.env.OPENSHIFT_NODEJS_IP, function(){
  console.log("Express server listening on port " + app.get('port'));
});
