<?php 
include  '../../common/conn-apiserver.php'; 
include  '../../common/conn-medoo.php'; 
include  '../../common/conn-sendgrid.php'; 

function valida_parametro_and_die($parametro, $mensaje_error){ 
	$parametro = "" . $parametro; 
	if ($parametro == "") { 
		$respuesta["resultado"] = "error"; 
		$respuesta["mensaje"] = $mensaje_error; 
		print_r(json_encode($respuesta)); 
		die(); 
	} 
}

function valida_error_medoo_and_die(){ 
	global $database, $mailerror; 
	if ($database->error()[2]) { 
		$respuesta["resultado"]="error"; 
		if($database->error()[1] == 1062)
		{
		    $respuesta["mensaje"]="Error al ejecutar script: Elementos duplicados";
		}
		else
		{
		    $respuesta["mensaje"]="Error al ejecutar script: " . $database->error()[2];
		}
		print_r(json_encode($respuesta)); 
		$mailerror->send("COTIZACIONES", getcwd(), $database->error()[2], $database->last_query(), "polo@codeart.mx"); 
		die(); 
	} 
}

$respuesta=array();
$json = file_get_contents('php://input'); //Obtiene lo que se envía vía POST
$objeto = json_decode($json); // Lo transforma de JSON a un objeto de PHP

$ID_PROSPECTO = $objeto->id_prospecto;
valida_parametro_and_die($ID_PROSPECTO, "Falta ID del prospecto");

$ID_PRODUCTO = $objeto->id_producto;
valida_parametro_and_die($ID_PRODUCTO, "Falta ID del producto");


    $id = $database->insert("COTIZACION_RAPIDA",[
        "NOMBRE" => $objeto->nombre,
        "ID_PROSPECTO" => $ID_PROSPECTO,
        "ID_PRODUCTO" => $ID_PRODUCTO,
        "REFERENCIA" => $objeto->REFERENCIA,
		"ANO_REFERENCIA" => date('Y'),	
        "FECHA_E1" => $objeto->FECHA_E1,
        "FECHA_E2" => $objeto->FECHA_E2,
        "FECHA_V1" => $objeto->FECHA_V1,
        "FECHA_V2" => $objeto->FECHA_V2,
        "FECHA_V3" => $objeto->FECHA_V3,
        "FECHA_V4" => $objeto->FECHA_V4,
        "FECHA_V5" => $objeto->FECHA_V5,
        "MONTO_E1" => $objeto->MONTO_E1,
        "MONTO_E2" => $objeto->MONTO_E2,
        "MONTO_V1" => $objeto->MONTO_V1,
        "MONTO_V2" => $objeto->MONTO_V2,
        "MONTO_V3" => $objeto->MONTO_V3,
        "MONTO_V4" => $objeto->MONTO_V4,
        "MONTO_V5" => $objeto->MONTO_V5,
        "DIAS_E1" => $objeto->DIAS_E1,
        "DIAS_E2" => $objeto->DIAS_E2,
        "DIAS_V1" => $objeto->DIAS_V1,
        "DIAS_V2" => $objeto->DIAS_V2,
        "DIAS_V3" => $objeto->DIAS_V3,
        "DIAS_V4" => $objeto->DIAS_V4,
        "DIAS_V5" => $objeto->DIAS_V5,
        "NO_EMPLEADOS" => $objeto->CANTIDAD_EMPLEADOS,
        "NO_SITIOS" => $objeto->CANTIDAD_SITIOS,
        "IMPORTE_CERTIFICADO" => $objeto->IMPORTE_CERTIFICADO,	
        "CERTIFICADO_ACREDITADO" => $objeto->CERTIFICADO,
        "VIATICOS_INCLUIDOS" => $objeto->VIATICOS,
        "IVA_INCLUIDO" => $objeto->IVA,
        "VIATICOS_E1" => $objeto->VIATICOS_E1,
        "VIATICOS_E2" => $objeto->VIATICOS_E2,
        "VIATICOS_V1" => $objeto->VIATICOS_V1,
        "VIATICOS_V2" => $objeto->VIATICOS_V2,
        "VIATICOS_V3" => $objeto->VIATICOS_V3,
        "VIATICOS_V4" => $objeto->VIATICOS_V4,
        "VIATICOS_V5" => $objeto->VIATICOS_V5,
        "PERIODICIDAD" => $objeto->PERIODICIDAD
       ]
   ); 
   valida_error_medoo_and_die();
   $respuesta['resultado']="ok";   

print_r(json_encode($respuesta)); 
?> 
