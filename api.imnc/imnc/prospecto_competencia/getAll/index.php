<?php 
	include  '../../ex_common/query.php';
	
	$nombre_tabla = "PROSPECTO_COMPETENCIA";
	$correo = "juliocesar.gallarza@dhttecno.com";
	
	$respuesta=array(); 
	$respuesta = $database->select($nombre_tabla,["ID","COMPETENCIA(DESCRIPCION)"]); 
	valida_error_medoo_and_die($nombre_tabla,$correo); 
	print_r(json_encode($respuesta)); 
?> 
