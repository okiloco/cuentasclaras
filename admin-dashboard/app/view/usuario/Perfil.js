
Ext.define('Admin.view.usuario.Perfil',{
    extend: 'Ext.form.Panel',

    requires: [
        'Admin.view.usuario.PerfilController',
        'Admin.view.usuario.PerfilModel'
    ],
    buttonAlign:'center',
    // controller: 'usuario-perfil',
    viewModel: {
        type: 'usuario-perfil'
    },
    fieldDefaults: {
        labelAlign: 'top',
        labelWidth: 60,
        columnWidth:.5
    },
    items:[
        {
            xtype:'panel',
            flex:1,
            layout:'hbox',
            items:[
                {
                    xtype:'panel',
                    region:'center',
                    flex:.4,
                    layout: {
                        type: 'vbox',
                        align: 'middle'
                    },
                    bodyPadding: '20px 5px',
                    items: [
                       {
                           xtype: 'image',
                           // cls: 'userProfilePic',
                           height: 120,
                           width: 120,
                           alt: 'profile-picture',
                           cls: 'header-right-profile-image',
                           src: 'resources/images/user-profile/2.png'
                       },
                       {
                           xtype: 'component',
                           cls: 'userProfileName',
                           height: '',
                           bind:{
                               html: '{nombre}'
                           }
                       },
                       {
                           xtype: 'component',
                           cls: 'userProfileDesc',
                           bind:{
                               html: '{rol}'
                           }
                       },
                       {
                           xtype: 'filefield',
                           name:'imagen',
                           width: 120,
                           hideLabel: true,
                           buttonOnly: true, 
                           buttonText: 'Subir foto perfil',
                           ui:'soft-cyan',
                           platformConfig: {
                               classic: {
                                   scale: 'small'
                               },
                               modern: {
                                   ui: 'soft-cyan'
                               }
                           },
                           handler:'onViewPerfil'
                       }
                    ]
                },
                {
                    xtype:'panel',
                    flex:1,
                    // title:'Datos Personales',
                    defaults:{
                        columnWidth:.5
                    },
                    
                    bodyPadding: '20px 5px',
                    items:[
                        {
                            xtype:'fieldset',
                            columnWidth: 1,
                            title: 'Datos Personales',
                            defaultType: 'textfield',
                            layout:'column',
                            defaults:{
                                margin:5
                            },
                            items:[
                                {
                                    xtype: 'hiddenfield',
                                    name: 'id'
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'nombres',
                                    emptyText: 'Nombres',
                                    allowBlank:false
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'apellidos',
                                    emptyText: 'Apellidos',
                                    allowBlank:false
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'identificacion',
                                    emptyText: 'Identificación'
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'telefono',
                                    emptyText: 'Telefono'
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'email',
                                    vtype: 'email',
                                    emptyText: 'Correo'
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'celular',
                                    emptyText: 'Celular'
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'direccion',
                                    emptyText: 'Dirección',
                                    columnWidth: 1
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    buttons:[
        {
            text: 'Guardar',
            ui:'soft-green',
            formBind: true, 
            disabled: true,
            handler:'onGuardar'
        },
        {
            text: 'Cancelar',
            ui:'soft-red',
            handler:function(self){
                self.up("window").close();
            }
        }
    ],
    listeners:{
        afterrender:'onRender'
    }
});
