Ext.define('Admin.view.usuario.views.UsuarioForm', {
	extend: 'Ext.form.Panel',
	alias: ['widget.usuarioform'],
	layout:'fit',
	bodypadding:10,
	buttonAlign:'right',
	fieldDefaults: {
        labelAlign: 'top',
        labelWidth: 60,
        columnWidth:.5
    },
    controller:'usuario-usuario',
    url:constants.URL_GUARDAR_USUARIO,
	initComponent: function() {
		var me = this;

		Ext.apply(me, {
			items:[
				{
					xtype:'tabpanel',
					layout:'fit',
					defaults:{
						bodyPadding:10,
						layout:{
							type:'fit',
							align:'stretch'
						}
					},
					items:[
						{
							title:'Datos Personales',
							items:[
								{
									xtype:'panel',
									flex:1,
									defaults:{
										columnWidth:.5
									},
									layout:'column',
									defaults:{
										margin:5,
									},
									items:[
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
											name: 'celular',
											emptyText: 'Celular'
										},
										{
											xtype: 'textfield',
											name: 'direccion',
											emptyText: 'Dirección'
										}
									]
								}
							]
						},
						{
							title:'Usuario',
							items:[
								{
									xtype:'panel',
									flex:1,
									defaults:{
										columnWidth:.5
									},
									layout:'column',
									defaults:{
										margin:5,
									},
									items:[
										{
											xtype: 'hiddenfield',
											name: 'id'
										},
										{
											xtype: 'textfield',
											name: 'username',
											emptyText: 'Usuario',
											allowBlank:(!((typeof(me.record)!="undefined") && (me.record.get("username")!='')))
										},
										{
											xtype: 'textfield',
											name: 'password',
											inputType: 'password',
											emptyText: 'Contraseña',
											hidden:(typeof(me.record)!="undefined"),
											// allowBlank:(typeof(me.record)!="undefined")											
										},
										{
											xtype: 'textfield',
											name: 'email',
											vtype: 'email',
											emptyText: 'Correo'
										},
										{
											xtype: 'listBox',
											name: 'rol_id',
											emptyText: 'Perfil',
											value:3,
											allowBlank:false,
											store: Ext.create('Admin.util.ux.Store', {
											    fields: ['id', 'nombre'],
											    autoLoad:true,
											   	url:constants.URL_LISTAR_ROLES
											}),
											queryMode: 'local',
										    displayField: 'nombre',
										    valueField: 'id'
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
					// formBind: true, 
			    	// disabled: true,
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
				afterrender:function(self){
					if(typeof(self.record)!="undefined"){
						self.loadRecord(self.record);
					}
				}
			}
		});
		me.callParent(arguments);
	}
});	