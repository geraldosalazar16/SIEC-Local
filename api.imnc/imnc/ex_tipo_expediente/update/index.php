<?php  
	include  '../../ex_common/query.php'; 
	
	$nombre_tabla = "EX_TIPO_EXPEDIENTE";
	$correo = "lqc347@gmail.com";
	
	$respuesta=array(); 
	$json = file_get_contents("php://input"); 
	$objeto = json_decode($json); 
$ID = $objeto->ID; 
$NOMBRE = $objeto->NOMBRE;
$FINALIZADO = $objeto->FINALIZADO; 
$VIGENTE = $objeto->VIGENTE; 
$DESCRIPCION = $objeto->DESCRIPCION; 
$FECHA_MODIFICACION = date('Y/m/d H:i:s'); 
$ID_USUARIO_MODIFICACION = $objeto->ID_USUARIO_MODIFICACION; 
	$id = $database->update($nombre_tabla, [ 
"NOMBRE" => $NOMBRE, 
"DESCRIPCION" => $DESCRIPCION, 
"VIGENTE" => $VIGENTE, 
"FINALIZADO" => $FINALIZADO,
"FECHA_MODIFICACION" => $FECHA_MODIFICACION, 
"ID_USUARIO_MODIFICACION" => $ID_USUARIO_MODIFICACION
	], ["ID"=>$ID]); 
	valida_error_medoo_and_die($nombre_tabla,$correo); 
	$respuesta["resultado"]="ok"; 
	print_r(json_encode($respuesta)); 
?> 
