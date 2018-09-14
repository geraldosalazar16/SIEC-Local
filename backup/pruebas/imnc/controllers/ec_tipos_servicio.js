app.controller('ec_tipos_servicio_controller',['$scope','$http' ,function($scope,$http){
	
	$scope.titulo	= "Cargando....";
	$scope.modulo_permisos =  global_permisos["SERVICIOS"];
	$scope.formData = {};
	$scope.prueba	= "PAGINA EN DESARROLLO";
	$scope.id_servicio_cliente_etapa = getQueryVariable("id_serv_cli_et");
// =======================================================================================
// ***** 			FUNCION PARA EL BOTON AGREGAR INFORMACION AUDITORIA				 *****
// =======================================================================================	
$scope.agregar_info_auditoria	=	function()	{
	$scope.modal_titulo = "Agregar informacion";
	clear_modal_agregar_informacion();
	if($scope.accion == 'insertar'){
		$scope.modal_titulo = "Agregar informacion";
	}
	if($scope.accion == 'editar'){
		$scope.modal_titulo = "Editar informacion";
		llenar_modal_editar_informacion();
	}
	$("#modalAgregarInformacion").modal("show");
}
// =======================================================================================
// ***** 		FUNCION PARA LLENAR EL MODAL EDITAR INFORMACION AUDITORIA			 *****
// =======================================================================================
function llenar_modal_editar_informacion(){
		cargarValoresMetaDatosServicio($scope.id_servicio_cliente_etapa);
		for(var key in $scope.MetaDatos){
			var datos_servicio	=	$scope.ValoresMetaDatos.find(function(element,index,array){
				return (element.ID_SERVICIO_CLIENTE_ETAPA == $scope.id_servicio_cliente_etapa && element.ID_META_SCE == $scope.MetaDatos[key].ID)
			});
			if(typeof datos_servicio != 'undefined'){
				$scope.formData.input[$scope.MetaDatos[key].ID]	= datos_servicio.VALOR;
			}
			else{
				$scope.formData.input[$scope.MetaDatos[key].ID]	= "";
			}
		}
		
}
// ===========================================================================
// ***** 		Funcion para limpiar las variables del modal			 *****
// ===========================================================================
function clear_modal_agregar_informacion(){
	
	$scope.formData.input	=	{};
		for(var key in $scope.MetaDatos){
				$scope.formData.input[$scope.MetaDatos[key].ID]	= "";
		}
}
	
// ===========================================================================
// ***** 			FUNCION PARA EL BOTON GUARDAR DEL MODAL				 *****
// ===========================================================================
	$scope.submitForm = function (formData) {
			var input = ""; 
			var indice	=	"";
			for(var key in $scope.formData.input){
				indice	+=	key+";";
				input	+=	$scope.formData.input[key]+";";
			}
			
			var datos	=	{
				ID	:	$scope.id_servicio_cliente_etapa,
				KEY	:	indice,
				INPUT	:	input,
				ID_USUARIO:	sessionStorage.getItem("id_usuario")
			};
		if($scope.accion == 'insertar'){
			
			$http.post(global_apiserver + "/i_tipos_servicios/insert/",datos).
            then(function(response){
                if(response){
					notify('Éxito','Se han actualizado los datos','success');
                   cargarValoresMetaDatosServicio($scope.id_servicio_cliente_etapa);
				   
                }
                else{
                    notify('Error','No se pudo guardar los cambios','error');
                }
                
            });
		 }
		if($scope.accion == 'editar'){	
			$http.post(global_apiserver + "/i_tipos_servicios/update/",datos).
            then(function(response){
                if(response){
					notify('Éxito','Se han actualizado los datos','success');
                   cargarValoresMetaDatosServicio($scope.id_servicio_cliente_etapa);
				   
                }
                else{
                    notify('Error','No se pudo guardar los cambios','error');
                }
                
            });
		}
		$("#modalAgregarInformacion").modal("hide");
		
	};
// =======================================================================================
// ***** 			FUNCION PARA EL BOTON AGREGAR INFORMACION AUDITORIA				 *****
// =======================================================================================	
	function cargarMetaDatos(id_servicio){
		$http.get(  global_apiserver + "/i_meta_sce/getByIdServicio/?id="+id_servicio)
		.then(function( response ){
			$scope.MetaDatos = response.data;
			
		});
		
	}
// ==============================================================================
// ***** 	Funcion para obtener datos servicio contratado a partir del id	*****
// ==============================================================================
	function DatosServicioContratado(id_servicio){
		$http.get(  global_apiserver + "/servicio_cliente_etapa/getById/?id="+id_servicio)
		.then(function( response ){
			
			$scope.DatosServicio = response.data;
			$scope.titulo = $scope.DatosServicio.NOMBRE_SERVICIO;
			$scope.aaaa	=	cargarMetaDatos($scope.DatosServicio.ID_SERVICIO);
		});
	
	}		
// ==============================================================================
// ***** 	Funcion para obtener metadatos de este servicio 				*****
// ==============================================================================
	function cargarValoresMetaDatosServicio(id_servicio){
		$http.get(  global_apiserver + "/i_tipos_servicios/getByIdServicio/?id="+id_servicio)
		.then(function( response ){
			$scope.ValoresMetaDatos = response.data;
			if($scope.ValoresMetaDatos.length == 0){
				$scope.titulo_boton_info_auditoria	=	"Agregar informacion auditoria";
				$scope.accion = 'insertar';
			}	
			else{		
				$scope.titulo_boton_info_auditoria	=	"Editar informacion auditoria";
				$scope.accion = 'editar';
			}	
		});
	}
	
DatosServicioContratado($scope.id_servicio_cliente_etapa);
cargarValoresMetaDatosServicio($scope.id_servicio_cliente_etapa);


}]);
function notify(titulo, texto, tipo) {
    new PNotify({
        title: titulo,
        text: texto,
        type: tipo,
        nonblock: {
            nonblock: true,
            nonblock_opacity: .2
        },
        delay: 2500
    });
}
function getQueryVariable(variable) {
	  var query = window.location.search.substring(1);
	  var vars = query.split("&");
	  for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
		  return pair[1];
		}
	  } 
	  alert('Query Variable ' + variable + ' not found');
	}