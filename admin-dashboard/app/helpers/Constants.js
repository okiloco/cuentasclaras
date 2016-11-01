Ext.define('Admin.helpers.Constants', {	
	alternateClassName: 'constants',
	singleton: true,

	//snapshot
	IMAGE_TYPE: "image/jpeg",

	//CAPTURA PLACA
	URL_LISTAR_VIDEOS:  'service/capturaplaca/listarvideos',
	URL_GENERAR_CASO : 'service/capturaplaca/generarcaso',
	URL_LISTAR_IMAGENES_VIDEO : 'service/capturaplaca/listarimagenesvideo',
	URL_PROCESAR_CASO : 'service/capturaplaca/procesarcaso',
	URL_CERRAR_CASO : 'service/capturaplaca/cerrarcaso',
	URL_CERRAR_VIDEO : 'service/capturaplaca/cerrarvideo',
	URL_RECHAZAR_IMAGEN : 'service/capturaplaca/rechazarimagen',
	URL_LISTAR_TIPO_INFRACCION : 'service/capturaplaca/listartipoinfraccion',
	URL_LISTAR_INFRACCIONES_CASO : 'service/capturaplaca/listarinfraccionescaso',
	URL_LISTAR_IMAGES_INFRACCION : 'service/capturaplaca/listarimagenesinfraccion',
	URL_VALIDAR_VIDEO_EXISTENTE : 'service/capturaplaca/validarvideoexistente',
	URL_GENERAR_INFRACCION : 'service/capturaplaca/generarinfraccion',
	URL_MARCAR_VIDEO_VISTO : 'service/capturaplaca/marcarvideovisto',
	URL_LISTAR_CAMARAS : 'contravencional/tests/listarcamaras',
	URL_LISTAR_INFRACCIONES_GENERADAS : 'service/aprobadoprocesamiento/listarinfraccionesgeneradas',
	URL_RECHAZAR_INFRACCION : 'service/aprobadoprocesamiento/rechazarinfraccion',
	URL_PROCESAR_INFRACCIONES_GENERADAS : 'service/aprobadoprocesamiento/procesarinfraccionesgeneradas',
	URL_DESCARGAR_INFRACCIONES_GENERADAS : 'service/aprobadoprocesamiento/descargarinfraccionesgeneradas',
	DISPOSITIVO4: 'Bloq42_Cam0004',

	// Varios
	URL_FTP: 'ftp/',
	URL_INFRACCION_DIR_FTP: 'INFRACCIONES_MAL_PARQUEO/',
	VIDEO_VISTO: 4,

	PROPIEDAD_CENTER_LAYOUT_WIDTH: '90%',
	PROPIEDAD_CENTER_LAYOUT_HEIGHT: '95%',

	//cambiar contraseña
	URL_CAMBIAR_CONTRASENA:'service/login/cambiarContrasena',




	//imagen
	RESOURE_IMAGE_VIDEO: 'resources/icons/ico-video.png',
	RESOURE_IMAGE_VIDEO_NO: 'resources/icons/ico-video2.png',

	//Estados
	PENDIENTE:1,// pendientes
	APROBADO:3,// aprobado
	RECHAZADO:2, //rechazados	
	PEN_AGENTE:7,//PENDIENTE VALIDACION AGENTE
	RECHA_AGENTE:8,//RECHAZADO AGENTE
	ACEP_AGENTE:9,//ACEPTADO AGENTE
	PENDIENTE_ARREGLO_DATOS:4,
	SI_CRUZARON:"SC",
	NO_CRUZARON:"NC",
	TODOS:"TO",
	ERROR_EN_PLACA: 1,

	//login
	URL_LOGIN_APP:'service/login/autenticar',
	// msg mask
	URL_MSG_MASK: 'Enviando datos... por favor espere...',
	EMPTY_MSG_GRID: '<h1>0 itmes encontrados</h1>',

	URL_LISTAR_CAUSALES_RECHAZO: 'service/capturaplaca/listarCausalRechazo',
	URL_RECHAZO_INFRACCION: 'service/capturaplaca/rechazarInfraccion',
	URL_APROBAR_INFRACCION: 'service/capturaplaca/aprobarInfracion',

	//ACEPTADOS PROCESAMIENTO
	URL_LISTAR_INFRACCION_ACEPTADO_PROCESAMIENTO:  'service/Aprobadoprocesamiento/listarAprobadosProcesamiento',
	URL_APROBAR_ACEPTADO_PROCESAMIENTO_LOTE: 'service/Aprobadoprocesamiento/aprobarAprobadosProcesamientoLote',
	URL_LISTAR_MOTIVO_ACEPTADO_PROCESAMIENTO: 'service/Aprobadoprocesamiento/motivoReprocesos',
	URL_REPROCESAR_ACEPTADO_PROCESAMIENTO: 'service/Aprobadoprocesamiento/reprocesarAP',

	//IMAGEN PRINCIPAL
	URL_ACTUALIZAR_IMAGEN_PRINCIPAL : 'service/correcciondireccion/actulizarimagenprincipal',

	//CORRECION DIRECCION
	URL_LISTAR_PENDIENTES_CORRECION_DIRECCION: 'service/correcciondireccion/listarCorreccionDireccion',	
	URL_LISTAR_DIRECCIONES_INCOMPLETAS: 'service/correcciondireccion/listarCorreccionDireccion',	
	URL_UPDATE_CORRECION_DIRECCION:'service/correcciondireccion/correccionDireccionUpdate',	
	URL_REPROCESAR_CORRECION_DIRECCION:'service/correcciondireccion/reprocesarCD',	
	URL_SIGUIENETE_PROCESO_CORRECION_DIRECCION:'service/correcciondireccion/aprobarProcesadosCD',
	URL_DIRECCION_INCOMPLETA:'service/correcciondireccion/direccionincompleta',
	URL_LISTAR_DIRECCION_INCOMPLETA:'service/correcciondireccion/listardireccionesincompletas',

	//APROBACION AGENTE
	URL_LISTAR_PENDIENTES_APROBACION_AGENTE: 'service/aprobacionagente/listarPendientesAprobacionAgente',
	URL_LISTAR_CAUSALES_RECHAZO_APROBACION_AGENTE: 'service/aprobacionagente/listarCausalRechazoAP',
	URL_RECHAZAR_APROBACION_AGENTE: 'service/aprobacionagente/rechazarInfraccionAP',
	URL_LISTAR_MOTIVOS_REPROCESO_APROBACION_AGENTE: 'service/aprobacionagente/motivoReprocesosPA',
	URL_REPROCESO_APROBACION_AGENTE: 'service/aprobacionagente/reprocesarPA',
	URL_APROBAR_APROBACION_AGENTE: 'service/aprobacionagente/aprobarInfracionAgente',
	URL_LISTAR_APROBADAS_RECHAZADAS_AGENTE: 'service/aprobacionagente/listarAprobasRechazadas',
	URL_GENERAR_REPORTE_AGENTE: 'service/aprobacionagente/reporteExcelAgente',

	//cargue csv
	URL_CARGAR_CSV: 'service/cargarinfraccionescsv/cargarCsvInfracciones',

	//cargue contravencional
	URL_LISTAR_CONTRAVENCIONAL:  'service/carguecontravencional/listarCarguecontravencionalAgrupado',
	URL_DESCARGUE_CSV_CONTRAVENCIONAL: 'service/carguecontravencional/downloadcsv',
	URL_LISTAR_USUARIO_ASINACION_CONTRAVENCIONAL: 'service/carguecontravencional/listarUsuariosAsignacionContravencional',
	URL_CARGAR_SISTEMA_CONTRAVENCIONAL: 'service/carguecontravencional/cargarcontravencional',

	//infracciones rechazadas
	URL_LISTAR_INFRACCIONES_RECHAZADAS:  'service/infraccionesrechazadas/listarinfraccionesrechazadas',
	URL_DOWNLOAD_LISTADO_INFRACCIONES_RECHAZADAS:  'service/infraccionesrechazadas/downloadcsv',
	URL_LISTAR_TIPOS_DUCUMENTOS:  'service/infraccionesrechazadas/listarTiposDocumentos'

});