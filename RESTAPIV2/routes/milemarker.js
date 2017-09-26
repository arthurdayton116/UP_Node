/**
 * http://usejsdoc.org/
 */
/**
 * http://usejsdoc.org/
 */
  var jsonfile = require('jsonfile')
  , fs = require('fs')
  ,path = require('path')
  , file = path.join(path.resolve('../', '/../', '../'),'Users','arthur','Documents','GIT','UP','UP_Node','testdata.json');
  
  
exports.milemarker = function(req, res) {
	
	
	var fileResult;
	var filetext;
	
	jsonfile.readFile(file, function(err, obj) {
		if(err){throw err;}
	  
		fileResult=JSON.stringify(obj);
		console.log(JSON.stringify(obj))
		var rval=obj.filter(function(x){return x.MileMarker==req.query.milepost;})
	/*  Object.keys(obj[0]).forEach(function(k) {
		
		  console.log(k+'='+obj[0][k]) });	  */
	  
	  filetext=JSON.stringify(obj[0])
	  console.log('t-'+filetext)
	  
	 if(!req.query.milepost) {
        return res.send({"status": "error", "message": "missing milepost"});
    } else if(rval.length==0) {
        return res.send({"status": "error", "message": "wrong milepost"});
    } else {
    	
        return res.send(rval[0]);
    }
	 
	})
	
 
};