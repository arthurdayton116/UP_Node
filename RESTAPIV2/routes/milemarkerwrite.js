/**
 * http://usejsdoc.org/
 */
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
  

  exports.milemarkerwrite = function(req, res) {
		
		jsonfile.readFile(file, function(err, obj) {
			if(err){throw err;}
		  
			fileResult=JSON.stringify(obj);
			console.log(JSON.stringify(obj))
			
			objnew=JSON.parse('{"Pass":"Arthur","MileMarker":202,"Elevation":9173,"ElevationUnit":"feet","ChangeinElevation":0.01,"PercentGrade":"West","Descent":"West"}')
			obj.push(objnew)
			
			console.log(JSON.stringify(obj[obj.length-1]))
			//return res.send('wrote it');
			//objnew=JSON.stringify(fileResult.push('{"Pass":"Arthur","MileMarker":202,"Elevation":9173,"ElevationUnit":"feet","ChangeinElevation":0.01,"PercentGrade":"West","Descent":"West"}'))
			
			//console.log(fileResult)
		  	jsonfile.writeFile(file, obj, {flag: 'w'}, function (err) {
		  			if(err){return res.send(err);}
	  
		  			return res.send('wrote it');
		  	})
		 
		})
		
	 
	};
	  