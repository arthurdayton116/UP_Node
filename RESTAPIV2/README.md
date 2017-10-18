

# RESTAPIV2



## Usage
###POST OPERATIONS

**StateChange  - This is a merge and returns results of merge**

Action is operation performed
Deleted is deleted values and Inserted is inserted values
Merge update operation generates delete and insert

>**Request:**

>		http://localhost:3000/StateChange

> **Body:**

>		{"STATEID":"state3","OBJECTNAME":"blah","USERNAME":"user1","PATH":"/path/tothe/page",  "OBJECTSTRING":"No Worries"}

> **Response:**

>		{"results":[{"Action":"UPDATE","deleted":{"D_ID":4,"D_USERNAME":"user1","D_PATH":"/path/tothe/page","D_STATEID":"state3","D_OBJECTNAME":"blah","D_STATEID_DESCR":"state3"},"inserted":{"I_ID":4,"I_USERNAME":"user1","I_PATH":"/path/tothe/page","I_STATEID":"state3","I_OBJECTNAME":"blah","I_STATEID_DESCR":"state3"}}]}
		length: 314 bytes Top  Bottom  2Request  Copy  Download

###GET OPERATIONS

**StateList - Returns list of page states based on USERNAME and PATH parameters**


> **Request:**

>		http://localhost:3000/StateList?USERNAME=user1&PATH=/path/tothe/page


> **Response:**

>		{"results":[{"text":"state3","id":4}]}

**CheckState - Returns true or false for exists based on USERNAME and PATH and STATEID parameters**


> **Request:**

>		http://localhost:3000/CheckState?USERNAME=user1&PATH=/path/tothe/page&STATEID=state32


> **Response:**

>		{"exists":"false"}


**ObjectString - Returns JSON string of object based on USERNAME and PATH and STATEID parameters**


> **Request:**

>		http://localhost:3000/ObjectString?USERNAME=user1&PATH=/path/tothe/page&STATEID=state3

> **Response:**

>		{"results":[{"OBJECTSTRING":"No Worries"}]}

## Developing



### Tools

Created with [Nodeclipse](https://github.com/Nodeclipse/nodeclipse-1)
 ([Eclipse Marketplace](http://marketplace.eclipse.org/content/nodeclipse), [site](http://www.nodeclipse.org))   

Nodeclipse is free open-source project that grows with your contributions.

Nodemon for autorestart
https://github.com/remy/nodemon#nodemon

Directory path
cd C:\Users\arthur\Documents\GIT\UP\UP_Node_Vlamis\RESTAPIV2

Startup using nodemon
nodemon app.js

PM2 for auto restart in prod
https://github.com/Unitech/pm2
Startup using PM2
pm2 start app.js

Using Restlet Client - REST API Testing on Chrome

SQL Server 
	  var config = {
	    userName: 'NPMUSER', // update me
	    password: '1yJ2BycH', // update me
	    server: 'sqltestinstance.c9z65c1hrnkv.us-west-2.rds.amazonaws.com',
	    options: {
	        database: 'TESTINGNPMWRITEBACK'
	    }
	    
sqltestinstance.c9z65c1hrnkv.us-west-2.rds.amazonaws.com,1433

npm install body-parser
