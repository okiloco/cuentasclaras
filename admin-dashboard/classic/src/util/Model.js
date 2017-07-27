Ext.define('Admin.util.Model', {
	alternateClassName: 'Models',
	constructor: function (config) {
        var me=this;
        Ext.applyIf(me,config);

        if(config.model!=undefined){
        	console.log(config.model.getData());
        }
        console.log("-> Hello World!",config);
        me.columns=me.getColumns();
    },
    getColumns:function(){
    	var me = this,
    	columns = [];
    	Ext.Array.each(me.fields, function(field, index, total) {
    	    console.log(typeof field);
    	});	
    }


});