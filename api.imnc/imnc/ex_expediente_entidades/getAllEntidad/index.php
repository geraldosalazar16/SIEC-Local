<?php 
include  '../../ex_common/query.php';
	
	$nombre_tabla = "ex_tabla_entidades";
	$correo = "galeanaisauro19@gmail.com";
    $respuesta=array(); 
    $respuesta = $database->select($nombre_tabla,"*"); 
    valida_error_medoo_and_die($nombre_tabla,$correo); 
    print_r(json_encode($respuesta)); 
	
?> 
