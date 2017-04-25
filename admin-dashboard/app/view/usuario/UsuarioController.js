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
    },
    onRegistrar:function(self){
      var grid=self.up("grid");

      Ext.create('Ext.window.Window', {
          title: 'Registrar Usuario',
          width: 500,
          layout: 'fit',
          modal: true,
          constrainHeader: true,
          resizable: false,
          items: [
            Ext.create("Admin.view.usuario.views.UsuarioForm",{
              grid:grid
            })
          ]
      }).show();
    },
    onGuardar:function(self){
      var form=self.up("form");

      if(form.getForm().isValid()){
        form.getForm().submit({
          scope: this,
          submitEmptyText : false,
          waitMsg: 'Enviando datos...',
          success: function(f, action) {
            form.up("window").close();
            form.grid.getStore().reload();
          },
          failure: function(f, action) {
            var responseObject = Ext.decode(response.responseText);
            Ext.Msg.show({
                title: 'Error',
                msg: responseObject.msg,
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR                    
            });
          }
        });
      }else{
        Ext.Msg.show({
            title: 'Atención',
            msg: 'Algunos datos son requeridos.',
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.WARNING                    
        });
      }
    },
    onEliminar:function(grid,rowIndex,colIndex){
      var record=grid.getStore().getAt(rowIndex);
      Ext.Msg.confirm('Eliminar Registro?', 'Desea eliminar el usuario?', function(buttonId, text, v) {
        if(buttonId == 'yes') {
          Ext.Ajax.request({
            scope: this,
            url: constants.URL_ELIMINAR_USUARIO,
            params: {
              id:record.get("id")
            },
            success: function(response) {
              var responseObject = Ext.decode(response.responseText);
              grid.getStore().reload();  
            },
            failure: function(response) {
              Ext.Msg.show({
                title: 'Error',
                msg: 'Error al procesar la petición.',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
              });
            }
          });
        }
      }, this);
    },
    onBloquear:function(grid,rowIndex,colIndex){
      var record=grid.getStore().getAt(rowIndex);
      var msg=(record.get("estado")==1)?'Desea Bloquear el usuario?':'Desea Habilitar el usuario?';
      
      Ext.Msg.confirm('Atención', msg, function(buttonId, text, v) {
        if(buttonId == 'yes') {
          Ext.Ajax.request({
            scope: this,
            url: constants.URL_BLOQUEAR_USUARIO,
            params: {
              id:record.get("id"),
              estado:record.get("estado")
            },
            success: function(response) {
              var responseObject = Ext.decode(response.responseText);
              grid.getStore().reload();  
            },
            failure: function(response) {
              var responseObject = Ext.decode(response.responseText);
              Ext.Msg.show({
                title: 'Error',
                msg: 'Error al procesar la petición.',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
              });
            }
          });
        }
      }, this);
    }
});
