Ext.define("Admin.view.usuario.Usuario",{
    extend: "Ext.panel.Panel",
    xtype:'usuarioview',

    requires: [
        "Admin.view.usuario.UsuarioController",
        "Admin.view.usuario.UsuarioModel"
    ],
    cls: 'share-panel',
    bodyPadding : 10,
    cls: 'shadow',
    margin: 20,
    controller: "usuario-usuario",
    viewModel: {
        type: "usuario-usuario"
    },
   layout:'fit',
   initComponent: function() {
       var me = this;

       
       var model=Ext.create("Admin.util.Model",{
        name:"Persona",
        fields:[
            'nombres',
            'apellidos',
            'identificacion',
            'telefono',
            'celular',
            'direccion',
            'id',
            'username',
            'password',
            'email',
            'rol_id',
        ] 
       });
       console.log(model);
       

       Ext.applyIf(me, {
            items:[
                {
                    xtype:'grilla',
                    cls: 'user-grid',
                    reference:'ref_grid_usuarios',
                    flex:1,
                    forceFit:true,
                    layout:'fit',
                    columns:[
                        {
                            text:'Nombre',
                            dataIndex:'nombre'
                        },
                        {
                            text:'Usuario',
                            dataIndex:'username'
                        },
                        {
                            text:'Perfil',
                            dataIndex:'rol'
                        },
                        {
                            text:'Estado',
                            dataIndex:'estado_desc'
                        },
                        {
                            xtype: 'actioncolumn',
                            items: [
                                {
                                    xtype: 'button',
                                    iconCls: 'x-fa fa-pencil',
                                    tooltip: 'Editar Registro',
                                    handler:'onEditar',                       
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'x-fa fa-close',
                                    tooltip: 'Eliminar Registro',
                                    handler:'onEliminar'
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'x-fa fa-ban',
                                    // tooltip: 'Bloquear/Desbloquear Usuario',
                                    handler:'onBloquear',
                                    getClass:function(v,meta,record){
                                        if(record.get("username")===''){
                                            return 'x-action-hidden';
                                        }
                                        if(record.get("estado")==-1){
                                            return 'x-fa fa-check';
                                        }else{
                                            return 'x-fa fa-ban';
                                        }

                                    }
                                }
                            ],

                            cls: 'content-column',
                            width: 50,
                            dataIndex: 'bool',
                            text: 'Acciones',
                           
                        }
                    ],
                    bind:{
                        store:'{usuarioStore}'                
                    },
                    dockedItems:[
                        {
                            xtype:'toolbar',
                            docked:'top',
                            items:[
                                {
                                    xtype:'searchbutton',
                                    name: 'filtro',
                                    width:250,
                                    emptyText:'Buscar por: Nombre, apellido',
                                    listeners:{
                                        search:'filtrarUsuario',
                                        clear:'limpiarFiltro'
                                    }
                                },
                                '->',
                                {
                                    xtype: 'button',
                                    text: 'Registrar',
                                    name: 'registrar',
                                    ui:'soft-green',
                                    handler:'onRegistrar'
                                }
                            ]
                        }
                    ]

                }
            ]   
       });

       me.callParent(arguments);
   }
});
