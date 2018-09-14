<?php
include "../common/apiserver.php";
session_start();

if ($_REQUEST["logout"] == "true") {
  session_unset();
  session_destroy();
}

if (isset($_REQUEST["login"])) {
  $username = $_REQUEST["username"];
  $password = $_REQUEST["password"];
  $mensaje_error = "";
  
  $respuesta = file_get_contents($global_apiserver . '/usuariosc/login/?email='.$username.'&password='.$password);
//echo $global_apiserver . '/usuariosc/login/?email='.$username.'&password='.$password;
  $respuesta = json_decode($respuesta);
 // echo $respuesta;
  if ($respuesta->resultado == "ok") {
    $_SESSION["logged_in"] = "true";
    $_SESSION["username"] = $respuesta->usuario->USUARIO;
    $_SESSION["perfil"] = $respuesta->usuario->PERFIL;
    $_SESSION["email_usuario"] = $respuesta->usuario->EMAIL;
    $_SESSION["nombre_usuario"] = $respuesta->usuario->NOMBRE;
    $_SESSION["id_usuario"] = $respuesta->usuario->ID;
    $permisos = (array) $respuesta->usuario->PERFIL2;
    $permisos_Array = [];
    foreach ($permisos as $key => $value) {
      $permisos_Array[$key] = (array) $value;
    }
    $_SESSION["permisos"] = $permisos_Array;
    echo "<script>window.location='http://apinube.com/pruebas/imnc/'</script>";
    //header("location: ../");
  }
  else
  {
    $mensaje_error = $respuesta->mensaje;
  }
}


?>

<?php include "../diff/selector.php"; ?>
<!DOCTYPE html>
<html lang="en">

<head><meta http-equiv="Content-Type" content="text/html; charset=gb18030">
  
  <!-- Meta, title, CSS, favicons, etc. -->
  
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title><?php echo $global_diffname; ?> </title>

  <!-- Bootstrap core CSS -->

  <link href="../css/bootstrap.min.css" rel="stylesheet">

  <link href="../fonts/css/font-awesome.min.css" rel="stylesheet">

  <link href="login.css" rel="stylesheet">


  <script src="../js/jquery.min.js"></script>
 <!--  <script src="login.js"></script> -->

  <!--[if lt IE 9]>
        <script src="../assets/js/ie8-responsive-file-warning.js"></script>
        <![endif]-->

  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
  <!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
          <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->

</head>

<body style="background:#ece9e9;">
  <div class="container" >
        <div class="card card-container text-center" style="background:#fff;">
           <?php echo '<img src="../diff/'.$global_diffname.'/logob.png" style="width: 350px; margin-bottom: 25px;  border: 2px solid #d8d8d8; padding: 5px;">'; ?>
            <p id="profile-name" class="profile-name-card">Bienvenido</p>
            <form class="form-signin" method="POST" action=".">
                <span id="reauth-email" class="reauth-email"></span>
                <input type="text" id="inputEmail" name="username" class="form-control" placeholder="Usuario o email" required autofocus>
                <input type="password" id="inputPassword" name="password" class="form-control" placeholder="Contrasena" required>
                <!-- <div id="remember" class="checkbox">
                    <label>
                        <input type="checkbox" value="remember-me"> Remember me
                    </label>
                </div> -->
                <button class="btn btn-lg btn-primary btn-block btn-signin" type="submit" name="login" value="Log in">Inicia sesion</button>
            </form><!-- /form -->
            <?php
            if ($mensaje_error != ""){
              echo '<div class="alert alert-danger alert-dismissible" role="alert" style="font-family: sans-serif; text-shadow: none; padding: 10px; font-size: 14px; text-align: left; background-color: #ece9e9; border-color: #a9112a; border-style: outset; border-width: 2px; color: #b50808;">'; 
              echo '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i> ';
              echo $mensaje_error;
              echo '</div>';
            }
            ?>
            <!-- <a href="#" class="forgot-password">
                Forgot the password?
            </a> -->
        </div><!-- /card-container -->
    </div><!-- /container -->

</body>

</html>
