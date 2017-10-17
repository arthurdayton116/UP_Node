/**
 * http://usejsdoc.org/
 */ 
//Look here for res.json
//https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;


exports.merge=function(req,res){
	var STATEID=req.body.STATEID;
	var OBJECTNAME=req.body.OBJECTNAME; 
	var USERNAME=req.body.USERNAME;
	var PAGENAME=req.body.PAGENAME;
	var PATH=req.body.PATH;
	var SUBDIVISION=req.body.SUBDIVISION;
	var GRADECHART=req.body.GRADECHART;
	var OBJECTSTRING=req.body.OBJECTSTRING;
	
	// Create connection to database
	var config = {
	  userName: 'NPMUSER', // update me
	  password: '1yJ2BycH', // update me
	  server: 'sqltestinstance.c9z65c1hrnkv.us-west-2.rds.amazonaws.com',
	  options: {
	      database: 'TESTINGNPMWRITEBACK'
	  }
	}
	var connection = new Connection(config);
	
	  // Attempt to connect and execute queries if connection goes through
	  connection.on('connect', function(err) {
	    if (err) {
	      console.log(err);
	    } else {
	      console.log('Connected');
	      InsertPayload();
	    }
	  });
	
	
		function InsertPayload() {
		    console.log("Inserting into Table...");

		    request = new Request(
		        'insert into CUSTOMIZATIONSTORAGE  (STATEID,OBJECTNAME,USERNAME,PAGENAME,PATH,SUBDIVISION,GRADECHART,OBJECTSTRING) values(@state,@object,@user,@pagename,@path,@sub,@grade,@jjson)',
		        function(err, rowCount, rows) {
			        if (err) {
			            console.log(err);
			        } else {
			            console.log(rowCount + ' row(s) inserted');
			            //callback(null, 'Nikita', 'United States');
			        }
		        });
		    request.addParameter('state', TYPES.NVarChar, STATEID);
		    request.addParameter('object', TYPES.NVarChar, OBJECTNAME);
		    request.addParameter('user', TYPES.NVarChar, USERNAME);
		    request.addParameter('pagename', TYPES.NVarChar, PAGENAME);
		    request.addParameter('path', TYPES.NVarChar, PATH);
		    request.addParameter('sub', TYPES.NVarChar, SUBDIVISION);
		    request.addParameter('grade', TYPES.NVarChar, GRADECHART);
		    request.addParameter('jjson', TYPES.NVarChar, OBJECTSTRING);
		    
		    connection.execSql(request);
		    
		    return res.send({"status": "worked", "message": "write"});
		    
		}
	  
	  
	  
	  
//console.log('query1='+query1)
	 
return res.send({"status": "worked", "message": "got message"});

}