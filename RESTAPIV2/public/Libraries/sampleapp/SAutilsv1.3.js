/**************************************************************************
* NOTE : All contents of this file are custom built JavaScript utility 
* code that is freely distributed for demonstrative purposes. It is not 
* included and not supported as part of any Oracle Business Intelligence 
* product.
**************************************************************************/

var SAutils = SAutils || {};

SAutils.getxmldoc=function(xmltext){
	if (window.DOMParser) {
		parser=new DOMParser();
		xmlDoc=parser.parseFromString(xmltext,"text/xml");
	} else {
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async=false;
		xmlDoc.loadXML(xmltext); 
	}
	return xmlDoc;
}

SAutils.getVarPromptInfo=function(varname){
	collections= gDocPromptManager.getAllPromptCollectionJSON();

	for(i=0;i<collections.length;i++){
		c=collections[i];
		for (j=0;j<c.promptSteps.length;j++){
			pstep=c.promptSteps[j];
			for (k=0;k<pstep.prompts.length;k++){
				p=pstep.prompts[k];
				if(p.promptType=="variablePrompt"){
					if (p.attributes.setVariableName.indexOf("['" + varname + "']")!=-1)
						return({"caption":p.caption,"scope":c.scope,"vsp":c.viewStatePath,"operator":p.operator});
				} 
			}
		}
	}
	return null;
}

SAutils.getColPromptInfo=function(formula){
	collections= gDocPromptManager.getAllPromptCollectionJSON();

	for(i=0;i<collections.length;i++){
		c=collections[i];
		for (j=0;j<c.promptSteps.length;j++){
			pstep=c.promptSteps[j];
			for (k=0;k<pstep.prompts.length;k++){
				p=pstep.prompts[k];
				if(p.promptType=="columnFilterPrompt"){
					if (p.dataType.displayColumnFormula==formula)
						return({"caption":p.caption,"formula":p.dataType.displayColumnFormula,"vsp":c.viewStatePath,"operator":p.operator});
				} 
			}
		}
	}
	return null;
}

SAutils.setColumnPrompt=function(formula,value){
	g_str = "<sawx:expr xmlns:sawx='com.siebel.analytics.web/expression/v1.1' xsi:type='sawx:list' op='_OP_' emptyAsAllChoices='true' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'><sawx:expr xsi:type='sawx:sqlExpression'>_COLFORMULA_</sawx:expr><sawx:expr xsi:type='xsd:string'>_VAL_</sawx:expr></sawx:expr>";
	pInfo = this.getColPromptInfo(formula);
	g_str = g_str.replace('_COLFORMULA_',pInfo.formula).replace('_VAL_',value).replace('_OP_',pInfo.operator);
	g = this.getxmldoc(g_str);
	PromptManager.submitPrompt(pInfo.vsp, true, "PromptFinish", g);
}

SAutils.setPSVarPrompt=function(varname,value){
	g_str="<sawx:expr xmlns:sawx='com.siebel.analytics.web/expression/v1.1' setVariable=\"dashboard.variables['_VAR_']\" xsi:type='sawx:setVariable' op='in' emptyAsAllChoices='false' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'><sawx:expr xsi:type='sawx:sqlExpression'/><sawx:expr xsi:type='sawx:untypedLiteral'>_VAL_</sawx:expr></sawx:expr>";
	pInfo = this.getVarPromptInfo(varname);
	g_str = g_str.replace('_VAR_',varname).replace('_VAL_',value);
	if(pInfo.scope=='dashboardPage')
		g_str = g_str.replace('dashboard.variables[','dashboard.currentPage.variables[');
	g= this.getxmldoc(g_str);
	PromptManager.submitPrompt(pInfo.vsp, true, "PromptFinish", g);
}

SAutils.setRequestVarPrompt=function(varname,value){
	g_str="<sawx:expr xmlns:sawx='com.siebel.analytics.web/expression/v1.1' setVariable=\"requestVariables['_VAR_']\" xsi:type='sawx:setVariable' op='in' emptyAsAllChoices='false' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'><sawx:expr xsi:type='sawx:sqlExpression'/><sawx:expr xsi:type='sawx:untypedLiteral'>_VAL_</sawx:expr></sawx:expr>";
	pInfo = this.getVarPromptInfo(varname);
	g= this.getxmldoc(g_str.replace('_VAR_',varname).replace('_VAL_',value));
	PromptManager.submitPrompt(pInfo.vsp, true, "PromptFinish", g);
}

SAutils.subscribetoMDEvent=function(channel,functionhandle,sourceviewname){
	var b = new obips.views.MaterDetailEventListener(channel, new obips.Callback(null, functionhandle));
	b.viewID= sourceviewname;
	obips.views.ViewController.getController("viewid").addEventListener(b);
}

SAutils.publishMDEvent=function(channel,values){
	var g_values="";
	for (i =0; i< values.length; i= i +2){
		var col = values[i].replace(/"/g,'%22').replace(/ /g,'%20');
		var val = values[i+1].replace(/"/g,'%22').replace(/ /g,'%20');
		var g = '{"_g": {"'+ col +'": ["' + val + '"]}}';
		g_values += g + ","; 
	}
	if (g_values.length> 0) 
		g_values = g_values.substring(0,g_values.length-1);
		
	o='{"_m":['+ g_values +']}';
    var r = new obips.views.MasterDetailEvent("viewid", o);
 	obips.views.ViewController.getController(r.sourceViewID).postClientEvent(channel, r);
}
