<?php
 
include $_SERVER["DOCUMENT_ROOT"] . "/api.imnc/imnc/common/medoolib/medoo.php";

$database = new medoo([
	// required
	'database_type' => 'mysql',
	'database_name' => 'sistemai_imnc_siec',
	'server' => 'localhost',
	'username' => 'sistemai_root',
	'password' => 'Password1028',
	'charset' => 'utf8',
 
	// [optional]
	'port' => 3306,
 
	// [optional] Table prefix
	//'prefix' => 'PREFIX_',
 
	// driver_option for connection, read more from http://www.php.net/manual/en/pdo.setattribute.php
	'option' => [
		PDO::ATTR_CASE => PDO::CASE_NATURAL
	]
]);
 
//echo "ok";
//Ejemplo de medoo
/*
$database->insert("USUARIO_EXPERTISE", [
	"ID_USUARIO" => 1,
	"ID_EXPERTISE" => 2
]);
*/

?>