Ext.define('Admin.model.usuario.Usuario', {
    extend: 'Admin.model.Base',
    fields:[
        {
            name:'nombre', mapping:'nombres', type:'string', allowNull:false,  convert:function(v,record){
                return v+" "+record.get("apellidos");
            }
        },
        'id',
        'username',
        'email',
        'cedula',
        'telefono',
        'celular',
        'direccion',
        'nombres',
        'apellidos',
        'rol_id',
        'rol',
        'estado'
    ]
});