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

    items:[
        {
            xtype:'grilla',
            cls: 'user-grid',
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
                    xtype: 'actioncolumn',
                    items: [
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-pencil',
                            tooltip: 'Editar ',
                            handler:'onEditar'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-close',
                            tooltip: 'Eliminar '
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-ban',
                            tooltip: 'Bloquear '
                        }
                    ],

                    cls: 'content-column',
                    width: 40,
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
                        }
                    ]
                }
            ]

        }
    ]
});
