Ext.define('Admin.util.ux.Store', {
	extend: 'Ext.data.Store',
	alias:'uxstore',
	xtype:'uxstore',
	constructor:function(config){
	  var me = this;
	  if(typeof(config.url)!='undefined'){
		  Ext.applyIf(config, {
		         pageSize:(typeof(config.pageSize)!="undefined")?config.pageSize:5,
		         proxy: {
		             extraParams:config.params,
		             actionMethods:{
		                read:(typeof(config.method!="undefined"))?config.method:"POST"
		             },
		             type: 'ajax',
		             url: config.url,
		             reader: {
		               type: 'json',
		               rootProperty: (typeof(config.rootProperty)!="undefined")?config.rootProperty:'data', 
		               idProperty:(typeof(config.idProperty)!="undefined")?config.idProperty:'id'
		             }
		         }	         
		  });
	  }
	  me.callParent([config]);
	 }  
});