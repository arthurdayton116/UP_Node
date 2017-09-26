/**
 * http://usejsdoc.org/
 */
//C:\Users\arthur\Documents\GIT\UP\UP_Node\testdata.json
const path = require('path');
var jsonfile = require('jsonfile')
const fs = require('fs');
var file = path.join(	
			path.resolve('../', '/../', '../'),'Users','arthur','Documents','GIT','UP','UP_Node','testdata.json'
			)

			fs.readFile(file, (err, data) => {
  if (err) throw err;
  data2=JSON.parse(data);
  Object.keys(data2[0]).forEach(function(k) {console.log(k)});
  console.log(JSON.parse(data));
});
	
jsonfile.readFile(file, function(err, obj) {
	if(err){throw err;}
  console.dir('test -'+ obj[0].MileMarker)
  
  Object.keys(obj[0]).forEach(function(k) {
	  console.log(k+'='+obj[0][k])
	  
  });
  
  console.log(Object.getOwnPropertyNames(obj).sort()); 
  
  
})