
/**
 * Module dependencies.
 */

var express = require('express')
// , cors = require('cors') 
  , routes = require('./routes')
 
    , checkState = require('./routes/SQLServerGetCheckState')
     , stateList = require('./routes/SQLServerGetStateList')
    , objectFetch = require('./routes/SQLServerGetObject')
    , stateChange = require('./routes/SQLServerMerge')
    
  , http = require('http')
  , path = require('path')
;

var app = express();
app.use(function(req, res, next) {
	   res.header("Access-Control-Allow-Origin", "*");
	   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
	   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	   next();
	});


var bodyParser     =        require("body-parser");
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb',parameterLimit: 100000, extended: true }));


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));

app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



//app.get('/', routes.index);
app.get('/test', routes.index2);
app.get('/StateList', stateList.getListofStateID);
app.get('/ObjectString', objectFetch.getObject);
app.get('/CheckState', checkState.checkExistence);
app.post('/StateChange', stateChange.merge);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
