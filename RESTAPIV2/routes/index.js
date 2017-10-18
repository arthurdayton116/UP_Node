
/*
 * GET home page.
 */
var path = require('path')
//, file = path.join(path.resolve('../', '/../', '../'),'Users','arthur','Documents','GIT','D3Example','EisenhowerPassOACLinux.html');
, file = path.join(path.resolve('../', '/../', '../'),'Users','jon','Desktop','REPO','D3','EisenhowerPassOACLinux.html');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.index2 = function(req, res){
	res.sendfile(file);
	};


