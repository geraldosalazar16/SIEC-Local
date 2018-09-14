<?php  
include  '../../common/conn-apiserver.php';  
include  '../../common/conn-medoo.php';  
include  '../../common/conn-sendgrid.php';  

function valida_parametro_and_die($parametro, $mensaje_error){ 
	$parametro = "" . $parametro; 
	if ($parametro == "" or is_null($parametro)) { 
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
		$mailerror->send("SERVICIO_CLIENTE_ETAPA", getcwd(), $database->error()[2], $database->last_query(), "polo@codeart.mx"); 
		die(); 
	} 
} 

$respuesta=array(); 
$json = file_get_contents("php://input"); 
$objeto = json_decode($json); 

$ID = $objeto->ID;
valida_parametro_and_die($ID, "Falta ID de servicio_cliente_etapa");; 

$ID_CLIENTE = $objeto->ID_CLIENTE; 
valida_parametro_and_die($ID_CLIENTE, "Es necesario seleccionar un cliente");

$ID_SERVICIO = $objeto->ID_SERVICIO; 
valida_parametro_and_die($ID_SERVICIO, "Es necesario seleccionar un servicio");

$ID_ETAPA_PROCESO = $objeto->ID_ETAPA_PROCESO; 
valida_parametro_and_die($ID_ETAPA_PROCESO, "Es neceario seleccionar un trámite");

$SG_INTEGRAL = $objeto->SG_INTEGRAL; // opcional

$REFERENCIA = $objeto->REFERENCIA;
valida_parametro_and_die($REFERENCIA, "Es necesario capturar la referencia");

$ID_USUARIO_MODIFICACION = $objeto->ID_USUARIO;
valida_parametro_and_die($ID_USUARIO_MODIFICACION,"Falta ID de USUARIO");
$CAMBIO= $objeto->CAMBIO;
$ID_REFERENCIA_SEG= $objeto->ID_REFERENCIA_SEG;
//$OBSERVACION_CAMBIO= $objeto->OBSERVACION_CAMBIO;

$FECHA_MODIFICACION = date("Ymd");
$HORA_MODIFICACION = date("His");

$id = $database->update("SERVICIO_CLIENTE_ETAPA", [ 
		"ID_CLIENTE" => $ID_CLIENTE, 
		"ID_SERVICIO" => $ID_SERVICIO, 
		"ID_ETAPA_PROCESO" => $ID_ETAPA_PROCESO, 
		"SG_INTEGRAL" => $SG_INTEGRAL, 
		"REFERENCIA" => $REFERENCIA, 
		"FECHA_MODIFICACION" => $FECHA_MODIFICACION,
		"HORA_MODIFICACION" => $HORA_MODIFICACION,
		"ID_USUARIO_MODIFICACION" => $ID_USUARIO_MODIFICACION,
		"CAMBIO"=>$CAMBIO,
		"ID_REFERENCIA_SEG"=>$ID_REFERENCIA_SEG,
		//"OBSERVACION_CAMBIO"=>$OBSERVACION_CAMBIO
	], 
	["ID"=>$ID]
); 
valida_error_medoo_and_die(); 
$respuesta["resultado"]="ok"; 
print_r(json_encode($respuesta)); 
?> 