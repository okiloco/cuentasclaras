Ext.define('Admin.util.Models', {
	alternateClassName: 'Models',
	singleton: true,
	constructor: function () {
        console.log("Hello World!");
    },
    CharField:function(config){
    	
    	var field={};
    	if(typeof config == 'object'){
    		Ext.apply(field,config);
    	}else{
    		console.log((config!=undefined)?config:-1);
    		field.maxLength=config;
    	}
    	return field;
    }

});