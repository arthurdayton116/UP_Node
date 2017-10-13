/**
 * http://usejsdoc.org/
 */
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;



//possible erroes -network interruption, database unavailable, user name, etc. not present

exports.readsql2 = function(req, res) {
	
	
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
	      getSavedCust();
	    }
	  });
	  
	    function getSavedCust() {
	    	if(!req.query.USERNAME|| !req.query.STATEID||!req.query.PATH) {
	    		return res.send({"status": "error", "message": "missing user, path or stateid"});
	    	}
	    	else{
	    		
	    		
	    	var sqlstmt="SELECT [OBJECTSTRING] FROM [TESTINGNPMWRITEBACK].[dbo].[CUSTOMIZATIONSTORAGE] " +
	    			"where [USERNAME]=@USER and [STATEID]=@STATEID and [PATH]=@PATH"
	    	
	        request = new Request(sqlstmt, function(err, rowCount) {
	          if (err) {
	            console.log(err);
	          } else {
	            console.log(rowCount + ' rows');
	        	if(rowCount==0){
	        		return res.send('no rows returned')
	        	}
	          }
	        });
	    	
	    	var STATEID=req.query.STATEID;
	    	var USERNAME=req.query.USERNAME;
	    	var PATH=req.query.PATH;
	    	
	    	console.log("Path - "+ PATH)
	    	request.addParameter('USER', TYPES.NVarChar, USERNAME);
	    	request.addParameter('STATEID', TYPES.NVarChar, STATEID);
	    	request.addParameter('PATH', TYPES.NVarChar, PATH);
	    	
	    	
	        request.on('row', function(columns) {
		          columns.forEach(function(column) {
		        	  
		            console.log(column.metadata.colName+' : '+column.value);
		            console.log('type: '+column.metadata.type.name);
		            console.log('typechange6: '+column.metadata.dataLength);
		            
		            if(column.metadata.colName=='OBJECTSTRING'){
		            objnew=JSON.parse(column.value)
		            console.log('val: '+objnew.value1)
		            return res.send(JSON.stringify(objnew))

		            }
		            
		          });
	        });
	        
	        request.on('done', function (rowCount, more, rows) {
	        	console.log(rowCount + ' rows from done');
	        
	            var status= connection.close()
	            console.log('status-'+status)
	        });
	        
	        connection.execSql(request);
	       
	    	}
	 }   
	    
}   
	  

  exports.readsql = function(req, res) {
		
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
	      executeStatement();
	    }
	  });
	  

		   
		    
		    //request.addParameter('Name', TYPES.NVarChar, name);
		  //  request.addParameter('Location', TYPES.NVarChar, location);
		    
		    
		    
		    function executeStatement() {
		    	if(!req.query.user) {
		    		return res.send({"status": "error", "message": "missing user"});
		    	}
		    	else{
		           
		    	var sqlstmt="SELECT [USERNAME],[PAGENAME],[PATH],[SUBDIVISION],[GRADECHART],[OBJECTSTRING] FROM [TESTINGNPMWRITEBACK].[dbo].[CUSTOMIZATIONSTORAGE] " +
		    			"where [USERNAME]=@USER"
		        request = new Request(sqlstmt, function(err, rowCount) {
		          if (err) {
		            console.log(err);
		          } else {
		            console.log(rowCount + ' rows');
		        	if(rowCount==0){
		        		return res.send('no rows returned')
		        	}
		          }
		        });
		    	
		    	request.addParameter('USER', TYPES.NVarChar, req.query.user);
		    	
		        request.on('row', function(columns) {
			          columns.forEach(function(column) {
			        	  
			            console.log(column.metadata.colName+' : '+column.value);
			            console.log('type: '+column.metadata.type.name);
			            console.log('typechange6: '+column.metadata.dataLength);
			            
			            if(column.metadata.colName=='OBJECTSTRING'){
			            objnew=JSON.parse(column.value)
			            console.log('val: '+objnew.value1)
			            return res.send(JSON.stringify(objnew))

			            }
			            
			          });
		        });
		        request.on('done', function (rowCount, more, rows) {
		        	console.log(rowCount + ' rows from done');
		        
		            var status= connection.close()
		            console.log('status-'+status)
		        });
		        
		        connection.execSql(request);
		       
		    	}
		 }   
		 
		    ;
		};