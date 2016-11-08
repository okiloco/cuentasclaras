Ext.define('Admin.view.usuario.UsuarioModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.usuario-usuario',
    data: {
        name: 'Admin'
    },
    stores:{
    	usuarioStore:{
    		xtype:'store',
    		autoLoad:true,
    		model:'Admin.model.usuario.Usuario',
    		proxy: {
		         type: 'ajax',
		         url:constants.URL_LISTAR_USUARIOS,
		         actionMethods:{
		         	read:'POST'
		         },
		         extraParams:{
		         	filtro:''
		         },
		         reader: {
		             type: 'json',
		             rootProperty: 'data'
		         }
		     },
    	}
    }

});
