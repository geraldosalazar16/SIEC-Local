<?php  
	include  '../../ex_common/query.php';
function valida_parametro_and_die1($parametro, $mensaje_error){ 
	$parametro = "" . $parametro; 
	if ($parametro == "" or is_null($parametro) or $parametro == "ninguno") { 
		$respuesta["resultado"] = "error"; 
		$respuesta["mensaje"] = $mensaje_error; 
		print_r(json_encode($respuesta)); 
		die(); 
	} 
}	
	
	$nombre_tabla = "PROSPECTO";
	$correo = "lqc347@gmail.com";
	
	$respuesta=array(); 
	$json = file_get_contents("php://input"); 
	$objeto = json_decode($json);
	
	$ID = $objeto->ID_PROSPECTO;
	valida_parametro_and_die1($ID, "Es necesario seleccionar un prospecto");
	$PORCENTAJE=$objeto->PORCENTAJE;
	valida_parametro_and_die1($PORCENTAJE, "Es necesario seleccionar el porcentaje");
	$ESTATUS=$objeto->ESTATUS;
	valida_parametro_and_die1($ESTATUS, "Es necesario seleccionar el estatus");

      
	$id = $database->update($nombre_tabla, [ 
		"ID_PORCENTAJE" => $PORCENTAJE,
		"ID_ESTATUS_SEGUIMIENTO" => $ESTATUS
	], ["ID"=>$ID]); 
	
	valida_error_medoo_and_die($nombre_tabla,$correo); 
	$respuesta["resultado"]="ok"; 
	print_r(json_encode($respuesta)); 
?> 
