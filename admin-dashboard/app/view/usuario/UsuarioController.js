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
    },
    limpiarFiltro:function(self){
      var me=this,
      grid=self.up("grid"),
      params={},
      toolbar=grid.down('toolbar[dock=top]');
      Ext.Array.each(toolbar.query('field'),function(item,index){
          item.reset();  
          params[item.name]=item.getValue();
      });
      grid.getStore().getProxy().extraParams=params;
      grid.getStore().loadPage(1);  
    },
    onEditar:function(grid,rowIndex,colIndex){
        var record=grid.getStore().getAt(rowIndex);
        Ext.create('Ext.window.Window', {
            title: 'Editar Usuario',
            width: 500,
            layout: 'fit',
            modal: true,
            constrainHeader: true,
            resizable: false,
            items: [
                Ext.create("Admin.view.usuario.views.UsuarioForm",{
                  record:record,
                  grid:grid
                })
            ]
        }).show();
    }

    
});
