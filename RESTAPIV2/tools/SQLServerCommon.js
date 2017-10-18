/**
 * http://usejsdoc.org/
 */
var Ted_Connection = require('tedious').Connection;
var Ted_Request = require('tedious').Request;
var Ted_TYPES = require('tedious').TYPES;


exports.myConnection = function() {
			
	// Create connection to database
	var config = {
	  userName: 'NPMUSER', // update me
	  password: '1yJ2BycH', // update me
	  server: 'sqltestinstance.c9z65c1hrnkv.us-west-2.rds.amazonaws.com',
	  options: {
	      database: 'TESTINGNPMWRITEBACK'
	  }
	
	}
	return new Ted_Connection(config);

}

exports.myRequest = function(sqlstmt,res) {
	
	return new Ted_Request(sqlstmt, function(err, rowCount) {
	    if (err) {
	      console.log(err);
	    } else {
	      console.log(rowCount + ' rows');
	  	if(rowCount==0){
	  		return res.send('no rows returned')
	  	}
	    }
	  });
	
}