Ext.define('Admin.model.usuario.Usuario', {
    extend: 'Admin.model.Base',
    fields:[
        {
            name:'nombre', type:'string', allowNull:false, mapping:'primer_nombre', convert:function(v,record){
                return v+" "+record.get("segundo_nombre")+" "+record.get("primer_apellido")+" "+record.get("segundo_apellido");
            }
        },
        'username',
        'rol'
    ]
});