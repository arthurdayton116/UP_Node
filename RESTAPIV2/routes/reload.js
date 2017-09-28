/**
 * http://usejsdoc.org/
 */
  exports.reload = function(req, res) {
		
	  var moduleName = req.params.file;
	  var moduleName2 = req.query.file;
	  console.log('moduleName: '+moduleName)
	  console.log('moduleName2: '+moduleName2)
	  
	  Object.keys(require.cache).forEach(function(key) { 
			  
			  if(key.indexOf('RESTAPIV2\\app.js')==-1)
			  {
				  
				  console.log('XXXXXXXXXXXX'+key)
				try{ 
					  delete require.cache[key]
					  require(key)
					  }
				catch(err){
						  console.log(err)
					  }
			  }
		  })
		  
	 /* delete require.cache[require.resolve('./'+ moduleName2+'.js')]
	  
	  delete require.cache['./'+ moduleName2];
	  console.log('delete')
	  require.resolve('./'+ moduleName2+'.js');
	  console.log('require')*/
	  return res.send('module '+moduleName2+' reloaded');
		};