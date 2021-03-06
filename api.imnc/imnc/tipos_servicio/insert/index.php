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
	$parametro = "".$parametro;
	if ($parametro == "") {
		$respuesta['resultado'] = 'error';
		$respuesta['mensaje'] = $mensaje_error;
		print_r(json_encode($respuesta));
		die();
	}
}

function valida_error_medoo_and_die(){
	global $database, $mailerror;
	if ($database->error()[2]) { //Aqui está el error
		$respuesta['resultado']="error";
		$respuesta['mensaje']="Error al ejecutar script: " . $database->error()[2];
		print_r(json_encode($respuesta));
		$mailerror->send("certificando", getcwd(), $database->error()[2], $database->last_query(), "polo@codeart.mx");
		die();
	}
}

$respuesta=array();
$json = file_get_contents('php://input'); //Obtiene lo que se envía vía POST
$objeto = json_decode($json); // Lo transforma de JSON a un objeto de PHP

$ID = $objeto->ID;
valida_parametro_and_die($ID, "Es necesario capturar una clave para el tipo de servicio");

$ID_SERVICIO = $objeto->ID_SERVICIO;
valida_parametro_and_die($ID_SERVICIO, "Es necesario seleccionar un servicio");

$ID_NORMA = $objeto->ID_NORMA;
valida_parametro_and_die($ID_NORMA, "Es necesario seleccionar una norma");

$NOMBRE = $objeto->NOMBRE;
valida_parametro_and_die($NOMBRE, "Es necesario capturar el nombre del tipo de servicio");

$FECHA_INICIO = $objeto->FECHA_INICIO;
valida_parametro_and_die($FECHA_INICIO, "Es necesario capturar una fecha de inicio");
if (strlen($FECHA_INICIO) != 8) {
	imprime_error_and_die("Verifica el formato de la fecha de inicio");
}
$anhio = intval(substr($FECHA_INICIO,0,4));
$mes = intval(substr($FECHA_INICIO,4,2));
$dia = intval(substr($FECHA_INICIO,6,2));
if (!checkdate($mes , $dia, $anhio)){
	imprime_error_and_die("La fecha de inicio no es válida");
}

$FECHA_FIN = $objeto->FECHA_FIN;
valida_parametro_and_die($FECHA_FIN, "Es necesario capturar una fecha de fin");
if (strlen($FECHA_FIN) != 8) {
	imprime_error_and_die("Verifica el formato de la fecha de fin");
}
$anhio = intval(substr($FECHA_FIN,0,4));
$mes = intval(substr($FECHA_FIN,4,2));
$dia = intval(substr($FECHA_FIN,6,2));
if (!checkdate($mes , $dia, $anhio)){
	imprime_error_and_die("La fecha de fin no es válida");
}
if ($FECHA_INICIO > $FECHA_FIN) {
	imprime_error_and_die("La fecha de inicio no puede ser después de la fecha final");
}

$ID_USUARIO_CREACION = $objeto->ID_USUARIO;
valida_parametro_and_die($ID_USUARIO_CREACION,"Falta ID de USUARIO");

$FECHA_CREACION = date("Ymd");
$HORA_CREACION = date("His");


$ACTUALIZACION = $objeto->ACTUALIZACION;

$SERVICIO_ACTUALIZACION = $objeto->SERVICIO_ACTUALIZACION;
$ANIO_ACTUALIZACION = $objeto->ANIO_ACTUALIZACION;
if($ACTUALIZACION == TRUE && isset($SERVICIO_ACTUALIZACION) == FALSE){
	imprime_error_and_die("Debe seleccionar el servicio");
}
if($ACTUALIZACION == TRUE && ($ANIO_ACTUALIZACION == '' || is_numeric($ANIO_ACTUALIZACION) == FALSE || strlen($ANIO_ACTUALIZACION) != 4)){
	imprime_error_and_die("El año debe ser un número de 4 dígitos");
}
$id = $database->insert("TIPOS_SERVICIO", [
	"ID" => $ID,
	"ID_SERVICIO" => $ID_SERVICIO,
	"ID_NORMA" => $ID_NORMA,
	"NOMBRE" => $NOMBRE,
	"FECHA_INICIO" => $FECHA_INICIO,
	"FECHA_FIN" => $FECHA_FIN,
	"FECHA_CREACION" => $FECHA_CREACION,
	"HORA_CREACION" => $HORA_CREACION,
	"ID_USUARIO_CREACION" => $ID_USUARIO_CREACION
]);
valida_error_medoo_and_die();

if($ACTUALIZACION == TRUE){
	$select_sectores = "SELECT * FROM SECTORES WHERE ID_TIPO_SERVICIO = '".$SERVICIO_ACTUALIZACION."'";
	$res_sectores = $database->query($select_sectores)->fetchAll(PDO::FETCH_ASSOC);
	for($i= 0; $i < sizeof($res_sectores);$i++){
		$id_sector = $database->insert("SECTORES", [
			"ID" => $res_sectores[$i]["ID"],
			"ID_TIPO_SERVICIO" => $ID,
			"ANHIO" => $ANIO_ACTUALIZACION,
			"NOMBRE" => $res_sectores[$i]["NOMBRE"],
			"FECHA_INICIO" => $res_sectores[$i]["FECHA_INICIO"],
			"FECHA_FIN" => $res_sectores[$i]["FECHA_FIN"],
			"FECHA_CREACION" => $FECHA_CREACION,
			"HORA_CREACION" => $HORA_CREACION,
			"ID_USUARIO_CREACION" => $ID_USUARIO_CREACION
		]);
	}
}
$respuesta['resultado']="ok";
$respuesta['id']=$id;
print_r(json_encode($respuesta));


//-------- FIN --------------
?>