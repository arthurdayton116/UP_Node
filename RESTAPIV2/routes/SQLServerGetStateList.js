//

var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

//custom module so we don't have to rewrite connection every time
SQLConnect=require('../tools/SQLServerCommon');  

//possible errors -network interruption, database unavailable, user name, etc. not present

//Exports modules for route
exports.getListofStateID = getStates;	 	

function comVars(){
	var main=this; 
	main.SQLresponse={};
	main.SQLresponse.results=[];
	main.respUser;
	main.respStateID;
	main.respStateDescr;
	main.respIDColumn;
	main.sqlstmt;
	main.request;
	main.connection=SQLConnect.myConnection();
}

function getStates(req, res,next) {

	var comV=new comVars;

	  // Attempt to connect and execute queries if connection goes through 
	  comV.connection.on('connect', function(err) {
	    if (err) {//to do deal with retry if network jitter
	      console.log(err);
	    } else {
	      console.log('Connected');
	  	//if missing parameters then reject else continue
	  	if(!req.query.USERNAME|| !req.query.PATH) {
	  		return res.send({"status": "error", "message": "missing user or  path"});
	  	}
	  	else{
	  		comV.sqlstmt="SELECT [ID_COLUMN],[USERNAME],[STATEID],[STATEID_DESCR] FROM [EBI_SAFE].[dbo].[UP_SAVED_STATE] " +
	      			"where [USERNAME]=@USER and [PATH]=@PATH"
	  	
	  		comV.request=SQLConnect.myRequest(comV.sqlstmt,res);
	  		comV.request.addParameter('USER', TYPES.NVarChar, req.query.USERNAME);
	  		comV.request.addParameter('PATH', TYPES.NVarChar, req.query.PATH);
	      	
	      	
	      	//process rows returned from sql statement
	  		comV.request.on('row', function(columns) {
	  	          columns.forEach(function(column) {
	  	            
	  	            if(column.metadata.colName=='USERNAME'){
	  	            	comV.respUser=column.value;
	  	            }
	  	            else if(column.metadata.colName=='STATEID'){
	  	            	comV.respStateID=column.value;
	  	            }
	  	            else if(column.metadata.colName=='STATEID_DESCR'){
	  	            	comV.respStateDescr=column.value;
	  	            }
	  	            else if(column.metadata.colName=='ID_COLUMN'){
	  	            	comV.respIDColumn=column.value;
	  	            }
	  	            
	  	          });
	  	          console.log('comV.SQLresponse'+comV.SQLresponse)
	  	          //SQLresponse.rows.push({"USERNAME":respUser,"STATEID":respStateID,"STATE_DESCR":respStateDescr})
	  	        comV.SQLresponse.results.push({"text":comV.respStateID,"id":comV.respIDColumn})
	  	          console.log(JSON.stringify(comV.SQLresponse))	
	          });
	          
	          //handle sql execution complete event
	          doneNess(comV.request,res,comV.SQLresponse);
	          
	          //submit sql statment
	          comV.connection.execSql(comV.request);
	  	}
	    }
	  });
}




function doneNess(request,res,SQLresponse){
    request.on('done', function (rowCount, more, rows) {console.log('done')
    	innerDoneNess();	            
    });
    request.on('doneProc', function (rowCount, more, rows) {console.log('doneProc')
    	innerDoneNess();	            
    });
    request.on('doneInProc', function (rowCount, more, rows) {console.log('doneInProc')
    	innerDoneNess();	            
    });
    
    function innerDoneNess(){
    	return res.send(JSON.stringify(SQLresponse))
        var status= connection.close()
        console.log('status-'+status)
    }
    

}  