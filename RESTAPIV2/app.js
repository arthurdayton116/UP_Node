
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
  , http = require('http')
  , path = require('path')
;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/account', account.account);
app.get('/milemarker', milemarker.milemarker);
app.get('/milemarkerwrite', milemarkerwrite.milemarkerwrite);
app.get('/readsql', readsql.readsql);
app.get('/reload', reload.reload);
app.put('/writesql', writesql.writesql);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
