Ext.define('Admin.helpers.Constants', {	
	alternateClassName: 'constants',
	singleton: true,

	URL_LOGIN_APP:'service/Login/accesoUsuario',
	URL_LOGOUT_APP:'service/Login/logout',

	/*USUARIO*/
	URL_LISTAR_USUARIOS:'service/Usuario/listarUsuarios',
	URL_GUARDAR_USUARIO:'service/Usuario/guardarUsuario',
	URL_ELIMINAR_USUARIO:'service/Usuario/eliminarUsuario',
	URL_BLOQUEAR_USUARIO:'service/Usuario/bloquearUsuario',
	URL_LISTAR_ROLES:'service/Usuario/listarRoles',
	URL_ACTUALIZAR_PERFIL:'service/Usuario/actualizarPerfil',

});