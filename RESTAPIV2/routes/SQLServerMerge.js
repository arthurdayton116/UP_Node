

//var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

//custom module so we don't have to rewrite connection every time
SQLConnect=require('../tools/SQLServerCommon');  

exports.merge=function(req,res){

	var SQLresponse={};
	SQLresponse.results=[];
	
	// Create connection to database
	  var connection=SQLConnect.myConnection();
	
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
		        
		    sqlstmt="MERGE [dbo].[UP_SAVED_STATE] AS target  " +
		    		" USING (SELECT @user, @path, @stateid,@objectstring,@objectname,@stateiddescr ) AS source " +
		    		"(UserName,Path,StateID,ObjectString,ObjectName,StateDescr) " +
		    		"ON (target.USERNAME = source.UserName and " +
		    		"target.PATH = source.Path and " +
		    		"target.STATEID = source.StateID)  " +
		    		"WHEN MATCHED THEN " +
		    		"UPDATE SET USERNAME = source.Username, PATH=source.Path,STATEID=source.StateID," +
		    		"OBJECTSTRING=source.ObjectString,OBJECTNAME=source.ObjectName,STATEID_DESCR=source.StateDescr " +
		    		"WHEN NOT MATCHED THEN  " +
		    		"INSERT (Username,Path, StateID,ObjectString,ObjectName,STATEID_DESCR)" +
		    		" VALUES (source.UserName, source.Path, source.StateID,source.ObjectString,source.ObjectName,source.StateDescr)" +
		    		"OUTPUT $action,  deleted.ID_COLUMN as D_ID, deleted.USERNAME as D_USERNAME, deleted.PATH as D_PATH, deleted.STATEID as D_STATEID," +
		    		" deleted.OBJECTNAME as D_OBJECTNAME, deleted.STATEID_DESCR as D_STATEID_DESCR, inserted.ID_COLUMN as I_ID, inserted.USERNAME as I_USERNAME," +
		    		" inserted.PATH as I_PATH, inserted.STATEID as I_STATEID, inserted.OBJECTNAME as I_OBJECTNAME, inserted.STATEID_DESCR as I_STATEID_DESCR;"
		   
		    
		    //var request=SQLConnect.myRequest(sqlstmt,res);
		    
		    var request= new Request(sqlstmt, function(err) {
			    if (err) {
			      console.log(err);
			    } else {
			    	console.log('request over')
			    }
			  });
		    
		    doneNess(request);
		    

	        request.on('row', function(columns) {
		          columns.forEach(function(column) {
		        	  if(column.metadata.colName=='$action'){
		        		  console.log('action')
		        		  SQLresponse.results.push({"Action":column.value})
		        		  SR=SQLresponse.results[0]
		        		  SR["deleted"]={}
		        		  SR["inserted"]={}
		        		  
		        		  
		        		  console.log(JSON.stringify(SQLresponse))
		        	  }
		        	  else {
		        		  if(column.metadata.colName.charAt(0)=='D'){
		        			  SR.deleted[column.metadata.colName]=column.value;	  
			        		  }
		        		  if(column.metadata.colName.charAt(0)=='I'){
		        			  SR.inserted[column.metadata.colName]=column.value;	  
			        		  }
		        		  
		        		  }
		        		  
		          });
	        });
	        

		    request.addParameter('stateid', TYPES.NVarChar, req.body.STATEID);
		    request.addParameter('stateiddescr', TYPES.NVarChar, req.body.STATEID);
		    request.addParameter('objectname', TYPES.NVarChar, req.body.OBJECTNAME);
		    request.addParameter('user', TYPES.NVarChar, req.body.USERNAME);
		    request.addParameter('path', TYPES.NVarChar, req.body.PATH);
		    request.addParameter('objectstring', TYPES.NVarChar, req.body.OBJECTSTRING);
		   
		    
		    
		    connection.execSql(request);
		    
		    
		}
	  
        function doneNess(request){
	        request.on('done', function (rowCount, more, rows) {
	        	console.log('done')
	        	innerDoneNess();	            
	        });
	        request.on('doneProc', function (rowCount, more, rows) {
	        	console.log('doneProc')
	        	console.log('more'+more)
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