/**
 * http://usejsdoc.org/
 */
//Look here for res.json
//https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;


exports.newWriteSQL=function(req,res){
	var USERNAME=req.body.USERNAME;
	var PAGENAME=req.body.PAGENAME;
	var PATH=req.body.PATH;
	var SUBDIVISION=req.body.SUBDIVISION;
	var GRADECHART=req.body.GRADECHART;
	var OBJECTSTRING=JSON.stringify(req.body.OBJECTSTRING);
	
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
		        'insert into CUSTOMIZATIONSTORAGE  (USERNAME,PAGENAME,PATH,SUBDIVISION,GRADECHART,OBJECTSTRING) values(@user,@version,@path,@sub,@grade,@jjson)',
		        function(err, rowCount, rows) {
			        if (err) {
			            console.log(err);
			        } else {
			            console.log(rowCount + ' row(s) inserted');
			            //callback(null, 'Nikita', 'United States');
			        }
		        });
		    request.addParameter('user', TYPES.NVarChar, USERNAME);
		    request.addParameter('version', TYPES.NVarChar, PAGENAME);
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


//possible erroes -network interruption, database unavailable, user name, etc. not present

exports.writesql = function(req, res) {
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
	      Insert();
	    }
	  });
	  
	/*   function Start(callback) {
	    console.log('Starting...');
	    callback(null, 'Jake', 'United States');
	}*/

	function Insert() {
	    console.log("Inserting into Table...");

	    request = new Request(
	        'insert into CUSTOMIZATIONSTORAGE  (USERNAME,PAGENAME,PATH,SUBDIVISION,GRADECHART,OBJECTSTRING) values(@user,@version,@path,@sub,@grade,@jjson)',
	        function(err, rowCount, rows) {
		        if (err) {
		            console.log(err);
		        } else {
		            console.log(rowCount + ' row(s) inserted');
		            //callback(null, 'Nikita', 'United States');
		        }
	        });
	    request.addParameter('user', TYPES.NVarChar, 'hello world');
	    request.addParameter('version', TYPES.NVarChar, 'hello world');
	    request.addParameter('path', TYPES.NVarChar, 'hello world');
	    request.addParameter('sub', TYPES.NVarChar, 'hello world');
	    request.addParameter('grade', TYPES.NVarChar, 'hello world');
	    request.addParameter('jjson', TYPES.NVarChar, 'hello world');
	    
	    connection.execSql(request);
	    
	    return res.send({"status": "worked", "message": "write"});
	    
	}


 
		};