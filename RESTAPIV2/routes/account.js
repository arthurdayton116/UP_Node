/**
 * http://usejsdoc.org/
 */
  var jsonfile = require('jsonfile')
  , fs = require('fs')
  ,path = require('path')
  , file = path.join(path.resolve('../', '/../', '../'),'Users','arthur','Documents','GIT','UP','UP_Node','testdata.json');
  
  
exports.account = function(req, res) {
	var accountDB={}
    accountDB.accountMock =[]
	
	accountDB.accountMock.push({"username": "nraboy", "password": "1234","twitter": "@nraboy" })
	accountDB.accountMock.push({"username": "arthur", "password": "5678","twitter": "@arthurdayton116" })
	accountDB.accountMock.push({"username": "jon", "password": "9012","twitter": "@mustachebi" })
	
	var rval=accountDB.accountMock.filter(function(x){return x.username==req.query.username;})
	var filetext;
	
	jsonfile.readFile(file, function(err, obj) {
		if(err){throw err;}
	  console.dir('test -'+ obj[0].MileMarker)
	  
	  Object.keys(obj[0]).forEach(function(k) {
		
		  console.log(k+'='+obj[0][k]) });	  
	  
	  filetext=JSON.stringify(obj[0])
	  console.log('t-'+filetext)
	  
	 if(!req.query.username) {
        return res.send({"status": "error", "message": "missing username"});
    } else if(rval.length==0) {
        return res.send({"status": "error", "message": "wrong username"});
    } else {
    	
        return res.send(rval[0]+filetext);
    }
	 
	})
	
 
};