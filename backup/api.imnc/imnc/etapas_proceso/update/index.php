<?php  
	include  '../../common/conn-apiserver.php';  
	include  '../../common/conn-medoo.php';  
	include  '../../common/conn-sendgrid.php';  
	function valida_parametro_and_die($parametro, $mensaje_error){ 
		$parametro = "" . $parametro; 
		if ($parametro == "") { 
			$respuesta["resultado"] = "error\n"; 
			$respuesta["mensaje"] = $mensaje_error; 
			print_r(json_encode($respuesta)); 
			die(); 
		} 
	} 
	function valida_error_medoo_and_die(){ 
		global $database, $mailerror; 
		if ($database->error()[2]) { 
			$respuesta["resultado"]="error"; 
			$respuesta["mensaje"]="Error al ejecutar script: " . $database->error()[2]; 
			print_r(json_encode($respuesta)); 
			$mailerror->send("ETAPAS_PROCESO", getcwd(), $database->error()[2], $database->last_query(), "polo@codeart.mx"); 
			die(); 
		} 
	} 
$respuesta=array(); 
$json = file_get_contents("php://input"); 
$objeto = json_decode($json); 

$ID = $objeto->ID; 
$ID_ETAPA = $objeto->ID_ETAPA; 
$ID_SERVICIO = $objeto->ID_SERVICIO; 
$ETAPA = $objeto->ETAPA; 
$DESCRIPCION=$objeto->DESCRIPCION;

$ID_USUARIO_MODIFICACION = $objeto->ID_USUARIO;
valida_parametro_and_die($ID_USUARIO_MODIFICACION,"Falta ID de USUARIO");

$FECHA_MODIFICACION = date("Ymd");
$HORA_MODIFICACION = date("His");

$id = $database->update("ETAPAS_PROCESO", 
	[ 
		"ID_SERVICIO" => $ID_SERVICIO, 
		"ETAPA" => $ETAPA, 
		"FECHA_MODIFICACION" => $FECHA_MODIFICACION,
		"HORA_MODIFICACION" => $HORA_MODIFICACION,
		"ID_USUARIO_MODIFICACION" => $ID_USUARIO_MODIFICACION,
		"DESCRIPCION"=>$DESCRIPCION
	], 
	[
		"ID_ETAPA"=>$ID_ETAPA
	]); 
	valida_error_medoo_and_die(); 
	$respuesta["resultado"]="ok"; 
	print_r(json_encode($respuesta)); 
?> 
