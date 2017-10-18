//

var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

//custom module so we don't have to rewrite connection every time
SQLConnect=require('../tools/SQLServerCommon');  





//possible errors -network interruption, database unavailable, user name, etc. not present

//Exports modules for route
exports.getListofStateID = function(req, res){commonFetch(req, res,'getListofStateID')};
exports.getObjectString = function(req, res){commonFetch(req, res,'getObjectString')};	 
exports.checkExistence = function(req, res){commonFetch(req, res,'checkExistence')};	
	
//function for fetching data
//takes route parameter to decide what sql to submit
	function commonFetch(req, res,route) {

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
	      
	      if(route=='getListofStateID'){
	    	  getList();
	      }
	      else if(route=='getObjectString'){
	    	  getObject();
	      }
	      else if(route=='checkExistence'){
	    	 checkState();
	      }
	    }
	  });
	  
	  
	    function getList() {
	    	//if missing parameters then reject else continue
	    	if(!req.query.USERNAME|| !req.query.PATH) {
	    		return res.send({"status": "error", "message": "missing user or  path"});
	    	}
	    	else{
		    	var sqlstmt="SELECT [ID_COLUMN],[USERNAME],[STATEID],[STATEID_DESCR] FROM [TESTINGNPMWRITEBACK].[dbo].[UP_SAVED_STATE] " +
		    			"where [USERNAME]=@USER and [PATH]=@PATH"
	    	
		    	var request=SQLConnect.myRequest(sqlstmt,res);
		 
		    	
		    	request.addParameter('USER', TYPES.NVarChar, req.query.USERNAME);
		    	request.addParameter('PATH', TYPES.NVarChar, req.query.PATH);
		    	
		    	
		    	//process rows returned from sql statement
		        request.on('row', function(columns) {
			          columns.forEach(function(column) {
			            
			            if(column.metadata.colName=='USERNAME'){
			            	respUser=column.value;
			            }
			            else if(column.metadata.colName=='STATEID'){
			            	respStateID=column.value;
			            }
			            else if(column.metadata.colName=='STATEID_DESCR'){
			            	respStateDescr=column.value;
			            }
			            else if(column.metadata.colName=='ID_COLUMN'){
			            	respIDColumn=column.value;
			            }
			            
			          });
			          
			          //SQLresponse.rows.push({"USERNAME":respUser,"STATEID":respStateID,"STATE_DESCR":respStateDescr})
			          SQLresponse.results.push({"text":respStateID,"id":respIDColumn})
			          console.log(JSON.stringify(SQLresponse))	
			          
		        });
		        
		        //handle sql execution complete event
		        doneNess(request);
		        
		        //submit sql statment
		        connection.execSql(request);
	       
	    	}
	 }  
	    
	    function getObject() {
	    	//if missing parameters then reject else continue
	    	if(!req.query.USERNAME|| !req.query.STATEID||!req.query.PATH) {
	    		return res.send({"status": "error", "message": "missing user, path or stateid"});
	    	}
	    	else{
	    		
	    		
	    	var sqlstmt="SELECT [OBJECTSTRING] FROM [TESTINGNPMWRITEBACK].[dbo].[UP_SAVED_STATE] " +
	    			"where [USERNAME]=@USER and [STATEID]=@STATEID and [PATH]=@PATH"
	    	
	    	var request=SQLConnect.myRequest(sqlstmt,res);
	    	
	    	request.addParameter('USER', TYPES.NVarChar, req.query.USERNAME);
	    	request.addParameter('STATEID', TYPES.NVarChar, req.query.STATEID);
	    	request.addParameter('PATH', TYPES.NVarChar, req.query.PATH);
	    	
	    	
	        request.on('row', function(columns) {
		          columns.forEach(function(column) {
		            
		            if(column.metadata.colName=='OBJECTSTRING'){
		            
		             SQLresponse.results.push({"OBJECTSTRING":column.value})
		          //  return res.send(JSON.stringify(objnew))

		            }
		            
		          });
	        });
	        
	        
	        //handle sql execution complete event
	        doneNess(request);
	        
	        //submit sql statment
	        connection.execSql(request);
	       
	    	}
	 }  

	    function checkState() {
	    	//if missing parameters then reject else continue
	    	if(!req.query.USERNAME|| !req.query.STATEID||!req.query.PATH) {
	    		return res.send({"status": "error", "message": "missing user, path or stateid"});
	    	}
	    	else{
	    		
	    		
	    	var sqlstmt="SELECT 1 FROM [TESTINGNPMWRITEBACK].[dbo].[UP_SAVED_STATE] " +
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
	    	
	    	
	       /* request.on('row', function(columns) {
		          columns.forEach(function(column) {
		            
		            if(column.metadata.colName=='OBJECTSTRING'){
		          //  objnew=JSON.parse(column.value)
		           // console.log('val: '+objnew.value1)
		            
		             SQLresponse.results.push({"OBJECTSTRING":column.value})
		          //  return res.send(JSON.stringify(objnew))

		            }
		            
		          });
	        });*/
	        
	        
	        //handle sql execution complete event
	      //  doneNess(request);
	        
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