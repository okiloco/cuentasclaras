Ext.define('Admin.view.usuario.UsuarioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.usuario-usuario',

    filtrarUsuario:function(self){
    	var me=this,
    	grid=self.up("grid"),
    	params={},
    	tooblar=grid.down("toolbar");

    	Ext.Array.each(tooblar.down("field"),function(item,index){
    		params[item.name]=item.getValue()
    	});
    	grid.getStore().getProxy().extraParams=params;
    	grid.getStore().loadPage(1);

    }

    
});
