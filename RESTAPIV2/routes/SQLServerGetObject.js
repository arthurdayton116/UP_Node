//

var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

//custom module so we don't have to rewrite connection every time
SQLConnect=require('../tools/SQLServerCommon');  

//possible errors -network interruption, database unavailable, user name, etc. not present

//Exports modules for route
exports.getObject = getObject;	 	

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

function getObject(req, res,next) {
	
	var comV=new comVars;
	 
	 
	  comV.connection.on('connect', function(err) {
		    if (err) {//to do deal with retry if network jitter
		      console.log(err);
		    } else {
		    	dostuff()
		    }
	  })
		    
		    function dostuff(){
		  		comV.sqlstmt="SELECT [OBJECTSTRING] FROM [EBI_SAFE].[dbo].[UP_SAVED_STATE] " +
				"where [USERNAME]=@USER and [STATEID]=@STATEID and [PATH]=@PATH"
		  	
		  		comV.request=new Request(comV.sqlstmt,function(err, rowCount) {
		  		    if (err) {
		  		      console.log(err);
		  		    } else {
		  		      console.log(rowCount + ' rows');
		  		  	if(rowCount==0){
		  		  		//return res.send('no rows returned')
		  		  	}
		  		    }
		  		  });
		  		
		  		comV.request.addParameter('USER', TYPES.NVarChar, req.query.USERNAME);
		  		comV.request.addParameter('PATH', TYPES.NVarChar, req.query.PATH);
		  		comV.request.addParameter('STATEID', TYPES.NVarChar, req.query.STATEID);
		  		
				comV.request.on('row', function(columns) {
			          columns.forEach(function(column) {
			            
			            if(column.metadata.colName=='OBJECTSTRING'){			            
			            	comV.SQLresponse.results.push({"OBJECTSTRING":column.value})
			            }
			          });
			          return res.send(JSON.stringify(comV.SQLresponse))
			         var status= comV.connection.close()
		        console.log('status-'+status)
			    });
	
		    comV.connection.execSql(comV.request);
		    }		    
}