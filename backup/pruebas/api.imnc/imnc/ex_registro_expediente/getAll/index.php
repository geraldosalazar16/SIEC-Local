<?php 
	include  '../init.php'; 
	include  '../../ex_common/getAll.php';

	$JOIN = [
		"[>]EX_EXPEDIENTE_ENTIDAD(exp_ent)" => ["EX_REGISTRO_EXPEDIENTE.ID_EXPEDIENTE_ENTIDAD" 
			=> "ID"],
		"[>]EX_TIPO_EXPEDIENTE(tipo_exp)" => ["exp_ent.ID_TIPO_EXPEDIENTE" => "ID"],
	];
	$columnas = [
		"EX_REGISTRO_EXPEDIENTE.ID(ID)",
		"EX_REGISTRO_EXPEDIENTE.VALIDO(VALIDO)",
	  	"EX_REGISTRO_EXPEDIENTE.ID_REGISTRO(ID_REGISTRO)",
	  	"EX_REGISTRO_EXPEDIENTE.ID_EXPEDIENTE_ENTIDAD(ID_EXPEDIENTE_ENTIDAD)",
	  	"tipo_exp.NOMBRE(NOMBRE_EXPEDIENTE_ENTIDAD)",
	];
	$sectores = $database->select($TABLA, $JOIN, $columnas);
	valida_error_medoo_and_die($TABLA, $CORREO); 
	print_r(json_encode($sectores));
?> 
