<?php 
include  '../../common/conn-apiserver.php'; 
include  '../../common/conn-medoo.php'; 
include  '../../common/conn-sendgrid.php'; 




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
$id_servicio_cliente_etapa = $_REQUEST["id"];
$id_catag_docum= $_REQUEST["id_catag_docum"];
$nombre_ciclo= $_REQUEST["nombre_ciclo"];
$respuesta=array();


$DOCUMENTO = $database->get("CATALOGO_DOCUMENTOS","*",["ID"=>$id_catag_docum]);



valida_error_medoo_and_die();

print_r(json_encode($DOCUMENTO));


//-------- FIN --------------
?>