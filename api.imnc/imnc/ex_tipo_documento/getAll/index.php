<?php 
	include  '../../ex_common/query.php';
	
	$nombre_tabla = "EX_TIPO_DOCUMENTO";
	$correo = "lqc347@gmail.com";
	
	$respuesta=array(); 
	$respuesta = $database->select($nombre_tabla,"*"); 
	valida_error_medoo_and_die($nombre_tabla,$correo); 
	print_r(json_encode($respuesta)); 
?> 
