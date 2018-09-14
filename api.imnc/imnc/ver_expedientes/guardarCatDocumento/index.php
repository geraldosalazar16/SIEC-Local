<?php  
include  '../../common/conn-apiserver.php';  
include  '../../common/conn-medoo.php';  
include  '../../common/conn-sendgrid.php';  

function imprime_error_and_die($mensaje){
	$respuesta['resultado'] = 'error';
	$respuesta['mensaje'] = $mensaje;
	print_r(json_encode($respuesta));
	die();
}


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
		die(); 
	} 
} 

$respuesta=array(); 
$json = file_get_contents("php://input"); 
$objeto = json_decode($json); 

$nombre = $objeto->nombre; 
valida_parametro_and_die($nombre, "Es necesario capturar un nombre");

$descripcion = "";
if($objeto->descripcion)
    $descripcion = $objeto->descripcion;

$id_etapa = $objeto->id_etapa; 
valida_parametro_and_die($id_etapa, "Es necesario seleccionar una etapa");

$id_seccion = $objeto->id_seccion; 
valida_parametro_and_die($id_seccion, "Es necesario seleccionar una seccion");
///////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////
$nombre_tabla = "CATALOGO_DOCUMENTOS";
$id1 = $database->insert($nombre_tabla, [ 
				"NOMBRE" => $nombre, 
				"DESCRIPCION" => $descripcion, 
				"ID_ETAPA" => $id_etapa,
				"ID_SECCION" => $id_seccion
				]); 
valida_error_medoo_and_die(); 

$respuesta["resultado"]="ok"; 
print_r(json_encode($respuesta)); 
?> 
