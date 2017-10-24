//

var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

//custom module so we don't have to rewrite connection every time
SQLConnect=require('../tools/SQLServerCommon');  





//possible errors -network interruption, database unavailable, user name, etc. not present

//Exports modules for route
exports.checkExistence = function(req, res,next){commonFetch(req, res)};	
	


//function for fetching data
//takes route parameter to decide what sql to submit
	function commonFetch(req, res,next) {

	var SQLresponse={};
	SQLresponse.results=[];
	var respUser;
	var respStateID;
	var respStateDescr;
	var respIDColumn;
	
	// Create connection to database
	  var connection=SQLConnect.myConnection();
	  

      
	  // Attempt to connect and execute queries if connection goes through 
	  connection.on('connect', function(err) {
	    if (err) {
	    	//to do deal with retry if network jitter
	      console.log(err);
	    } else {
	      console.log('Connected');
	      
	    	 checkState();
	      }
	  });
	  

	    function checkState() {
	    	//if missing parameters then reject else continue
	    	if(!req.query.USERNAME|| !req.query.STATEID||!req.query.PATH) {
	    		return res.send({"status": "error", "message": "missing user, path or stateid"});
	    	}
	    	else{
	    		
	    		
	    	var sqlstmt="SELECT 1 FROM [EBI_SAFE].[dbo].[UP_SAVED_STATE] " +
	    			"where [USERNAME]=@USER and [STATEID]=@STATEID and [PATH]=@PATH"
	    	
	    	//var request=SQLConnect.myRequest(sqlstmt,res);
	    	
		    var request= new Request(sqlstmt, function(err,rowCount) {
			    if (err) {
			      console.log(err);
			    } else {
			    	if(rowCount==0){
			    		return res.send('{"exists":"false"}')
			    	}
			    	else if(rowCount==1){
			    		return res.send('{"exists":"true"}')
			    	}
			    	else{
			    		return res.send('{"exists":"unknown result - row count="'+rowCount+'}')
			    	}
		        	
		        	
		            var status= connection.close()
		            console.log('status-'+status)
			    }
			  });
	    	
	    	request.addParameter('USER', TYPES.NVarChar, req.query.USERNAME);
	    	request.addParameter('STATEID', TYPES.NVarChar, req.query.STATEID);
	    	request.addParameter('PATH', TYPES.NVarChar, req.query.PATH);
	        
	        //submit sql statment
	        connection.execSql(request);
	       
	    	}
	 }  
	    
	    
        function doneNess(request){
	        request.on('done', function (rowCount, more, rows) {
	        	console.log('done')
	        	innerDoneNess();	            
	        });
	        request.on('doneProc', function (rowCount, more, rows) {
	        	console.log('doneProc')
	        	innerDoneNess();	            
	        });
	        request.on('doneInProc', function (rowCount, more, rows) {
	        	console.log('doneInProc')
	        	innerDoneNess();	            
	        });
	        
	        function innerDoneNess(){

	        	  
	        	return res.send(JSON.stringify(SQLresponse))
	        	
	            var status= connection.close()
	            console.log('status-'+status)
	        }
	        

        }   
	    
}  