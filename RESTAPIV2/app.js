
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
   , account = require('./routes/account')
   , milemarker = require('./routes/milemarker')
    , milemarkerwrite = require('./routes/milemarkerwrite')
    , readsql = require('./routes/readsql')
    , writesql = require('./routes/writesql')
    , reload = require('./routes/reload')
    
    , stateList = require('./routes/SQLServerReadStateList')
    , stateChange = require('./routes/SQLServerMerge')
    
  , http = require('http')
  , path = require('path')
;

var app = express();
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

app.get('/', routes.index);
app.get('/page', routes.index2);
app.get('/users', user.list);
app.get('/account', account.account);
app.get('/milemarker', milemarker.milemarker);
app.get('/milemarkerwrite', milemarkerwrite.milemarkerwrite);
app.get('/readsql', readsql.readsql);
app.get('/reload', reload.reload);
app.put('/writesql', writesql.writesql);
app.post('/writesql2', writesql.newWriteSQL);
app.get('/readsql2', readsql.readsql2);

app.get('/StateList', stateList.getListofStateID);
app.get('/ObjectString', stateList.getObjectString);
app.post('/StateChange', stateChange.merge);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
