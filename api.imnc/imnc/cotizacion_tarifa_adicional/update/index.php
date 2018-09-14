<?php  
	include  '../../ex_common/query.php';  
	
	$nombre_tabla = "COTIZACION_TARIFA_ADICIONAL";
	$correo = "leovardo.quintero@dhttecno.com";
	
	$respuesta=array(); 
	$json = file_get_contents("php://input"); 
	$objeto = json_decode($json); 
	$ID = $objeto->ID; 

	$ID_TARIFA_ADICIONAL = $objeto->ID_TARIFA_ADICIONAL;
	valida_parametro_and_die($ID_TARIFA_ADICIONAL,"Es necesario capturar la tarifa"); 
	$ID_TRAMITE = $objeto->ID_TRAMITE; 
	valida_parametro_and_die($ID_TRAMITE,"Es necesario capturar el tramite");
	$CANTIDAD = $objeto->CANTIDAD; 
	valida_parametro_and_die($CANTIDAD,"Es necesario capturar la cantidad");

	$id = $database->update($nombre_tabla, [ 
		"ID_TARIFA_ADICIONAL" => $ID_TARIFA_ADICIONAL,
		"CANTIDAD" => $CANTIDAD
	], ["ID"=>$ID]); 
	valida_error_medoo_and_die($nombre_tabla,$correo); 
	$respuesta["resultado"]="ok"; 
	print_r(json_encode($respuesta)); 
?> 
