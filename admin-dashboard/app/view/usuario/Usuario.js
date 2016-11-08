Ext.define("Admin.view.usuario.Usuario",{
    extend: "Ext.panel.Panel",
    xtype:'usuarioview',
    requires: [
        "Admin.view.usuario.UsuarioController",
        "Admin.view.usuario.UsuarioModel"
    ],

    controller: "usuario-usuario",
    viewModel: {
        type: "usuario-usuario"
    },
    layout:{
        type:'fit',
        align:'strecht'
    },

    items:[
        {
            xtype:'grilla',
            flex:1,
            forceFit:true,
            layout:'fit',
            columns:[
                {
                    xtype:'actioncolumn',
                    items:[
                        {

                        }
                    ]
                },
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
                            xtype: 'textfield',
                            name: 'filtro',
                            emptyText: 'Filtrar'
                        },
                        '-',
                        {
                            xtype: 'button',
                            text: 'Filtrar',
                            name: 'filtrar',
                            handler:'filtrarUsuario'
                        }
                    ]
                }
            ]

        }
    ]
});
