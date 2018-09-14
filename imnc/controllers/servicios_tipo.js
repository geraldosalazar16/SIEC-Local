

function fill_cmb_ser(seleccionado){
  $.getJSON(  global_apiserver + "/servicios/getAll/", function( response ) {
    $("#cmbIdS").html('<option value="elige" selected disabled>-elige una opción-</option>');
    $.each(response, function( indice, objServ ) {
      $("#cmbIdS").append('<option value="'+objServ.ID+'">'+objServ.ID+'</option>'); 
    });
    $("#cmbIdS").val(seleccionado);
  });
}

function fill_cmb_nor(seleccionado){
  $.getJSON(  global_apiserver + "/normas/getAll/", function( response ) {
    $("#cmbIdN").html('<option value="elige" selected disabled>-elige una opción-</option>');
    $.each(response, function( indice, objNor ) {
      $("#cmbIdN").append('<option value="'+objNor.ID+'">'+objNor.ID+'</option>'); 
    });
    $("#cmbIdN").val(seleccionado);
  });
}

function fill_cmb_servicio(){
  $.getJSON(  global_apiserver + "/tipos_servicio/getAll/", function( response ) {
    $("#cmbCopiaServicio").html('<option value="elige" selected disabled>-elige una opción-</option>');
    $.each(response, function( indice, objtser ) {
      $("#cmbCopiaServicio").append('<option value="'+objtser.ID+'">'+objtser.NOMBRE+'</option>'); 
    });
  });
}

function clear_modal_insertar_actualizar(){
  $("#txtId").val("");
  $("#txtId").removeAttr("readonly");
  $("#txtNombre").val("");
  $("#txtIni").val("");
  $("#txtTer").val("");
  fill_cmb_ser("elige");
  fill_cmb_nor("elige");
  fill_cmb_servicio();
}

function fill_modal_insertar_actualizar(id_tipo_servicio){
  $.getJSON(  global_apiserver + "/tipos_servicio/getById/?id="+id_tipo_servicio, function( response ) {
        var fec_ini = response.FECHA_INICIO;
        fec_ini = fec_ini.substring(6,8)+"/"+fec_ini.substring(4,6)+"/"+fec_ini.substring(0,4);
        var fec_fin = response.FECHA_FIN;
        fec_fin = fec_fin.substring(6,8)+"/"+fec_fin.substring(4,6)+"/"+fec_fin.substring(0,4);
        $("#txtId").val(response.ID);
        $("#txtId").attr("readonly","true")
        $("#txtNombre").val(response.NOMBRE);
        $("#txtIni").val(fec_ini);
        $("#txtTer").val(fec_fin);
        fill_cmb_ser(response.ID_SERVICIO);
        fill_cmb_nor(response.ID_NORMA);
     });
}

function notify(titulo, texto, tipo){
    new PNotify({
        title: titulo,
        text: texto,
        type: tipo,  
        nonblock: {
            nonblock: true,
            nonblock_opacity: .2
        },
        delay: 2500
    });
}

function draw_row_tiposer(objServ){
  var fec_ini = objServ.FECHA_INICIO;
  fec_ini = fec_ini.substring(6,8)+"/"+fec_ini.substring(4,6)+"/"+fec_ini.substring(0,4);
  var fec_fin = objServ.FECHA_FIN;
  fec_fin = fec_fin.substring(6,8)+"/"+fec_fin.substring(4,6)+"/"+fec_fin.substring(0,4);
  var strHtml = "";
  strHtml += '<tr class="even pointer">';
  strHtml += '  <td>'+objServ.ID+'<br>'+objServ.NOMBRE+'</td>';
  strHtml += '  <td>'+objServ.ID_NORMA+'</td>';
  strHtml += '  <td>'+objServ.ID_SERVICIO+'</td>';
  strHtml += '  <td>'+fec_ini+'</td>';
  strHtml += '  <td>'+fec_fin+'</td>';
  strHtml += '  <td>';
  if (global_permisos["SERVICIOS"]["catalogos"] == 1 ) {
    strHtml += '    <button type="button" class="btn btn-primary btn-xs btn-imnc btnEditar" id_tipo_servicio="'+objServ.ID+'" style="float: right;"> ';
    strHtml += '      <i class="fa fa-edit"> </i> Editar tipo de servicio';
    strHtml += '    </button>';
  }
  strHtml += '  </td>';
  strHtml += '</tr>';
  return strHtml;
}


function draw_tabla_tiposer(){
 $.getJSON(  global_apiserver + "/tipos_servicio/getAll/", function( response ) {
      //console.log(response);
      $("#tbodyServT").html("");
      $.each(response, function( index, objServ ) {
        $("#tbodyServT").append(draw_row_tiposer(objServ));  
      });
      listener_btn_editar();
   });
}

function listener_btn_nuevo(){
  $( "#btnNuevo" ).click(function() {
    $("#btnGuardar").attr("accion","insertar");
	$("#divcheckactualizar").show();
	$("#divactualizar").hide();
	$("#divactualizaranio").hide();
	$("#checkactualizacion").prop('checked', false);
    $("#modalTitulo").html("Insertar servicio");
    clear_modal_insertar_actualizar();
    $("#modalInsertarActualizar").modal("show");
  });
}

function listener_btn_editar(){
  $( ".btnEditar" ).click(function() {
    $("#btnGuardar").attr("accion","editar");
	$("#divcheckactualizar").hide();
	$("#divactualizar").hide();
	$("#divactualizaranio").hide();
	$("#checkactualizacion").prop('checked', false);
    $("#btnGuardar").attr("id_ser",$(this).attr("id_tipo_servicio"));
    $("#modalTitulo").html("Editar servicio");
    fill_modal_insertar_actualizar($(this).attr("id_tipo_servicio"));
    $("#modalInsertarActualizar").modal("show");
  });
}

function listener_btn_guardar(){
  $( "#btnGuardar" ).click(function() {
    if ($("#btnGuardar").attr("accion") == "insertar")
    {
      insertar();
    }
    else if ($("#btnGuardar").attr("accion") == "editar")
    {
      editar();
    }
  });
}

function listener_check_actualizar(){
  $( "#checkactualizacion" ).click(function() {
    if ($("#checkactualizacion").is(':checked'))
    {
		$("#divactualizar").show();
		$("#divactualizaranio").show();
    }
    else
    {
		$("#divactualizar").hide();
		$("#divactualizaranio").hide();
    }
  });
}

function insertar(){
  var fec_ini = $("#txtIni").val();
  fec_ini = fec_ini.substring(6,10)+fec_ini.substring(3,5)+fec_ini.substring(0,2);
  var fec_fin = $("#txtTer").val();
  fec_fin = fec_fin.substring(6,10)+fec_fin.substring(3,5)+fec_fin.substring(0,2);
  var tipo_servicio = {
    ID:$("#txtId").val(),
    ID_SERVICIO:$("#cmbIdS").val(),
    ID_NORMA:$("#cmbIdN").val(),
    NOMBRE:$("#txtNombre").val(),
    FECHA_INICIO:fec_ini,
    FECHA_FIN:fec_fin,
	ACTUALIZACION:$("#checkactualizacion").is(':checked'),
	SERVICIO_ACTUALIZACION: $("#cmbCopiaServicio").val(),
	ANIO_ACTUALIZACION: $("#txtAnio").val(),
    ID_USUARIO:sessionStorage.getItem("id_usuario")
  };
  $.post( global_apiserver + "/tipos_servicio/insert/", JSON.stringify(tipo_servicio), function(respuesta){
      respuesta = JSON.parse(respuesta);
      if (respuesta.resultado == "ok") {
        $("#modalInsertarActualizar").modal("hide");
        notify("Éxito", "Se ha insertado un nuevo registro", "success");
        draw_tabla_tiposer();
        //document.location = "./?pagina=auditores";
      }
      else{
          notify("Error", respuesta.mensaje, "error");
        }
      
  });
}

function editar(){
  var fec_ini = $("#txtIni").val();
  fec_ini = fec_ini.substring(6,10)+fec_ini.substring(3,5)+fec_ini.substring(0,2);
  var fec_fin = $("#txtTer").val();
  fec_fin = fec_fin.substring(6,10)+fec_fin.substring(3,5)+fec_fin.substring(0,2);
  var tipo_servicio = {
    ID:$("#txtId").val(),
    ID_SERVICIO:$("#cmbIdS").val(),
    ID_NORMA:$("#cmbIdN").val(),
    NOMBRE:$("#txtNombre").val(),
    FECHA_INICIO:fec_ini,
    FECHA_FIN:fec_fin,
     ID_USUARIO:sessionStorage.getItem("id_usuario")
  };
    $.post( global_apiserver + "/tipos_servicio/update/", JSON.stringify(tipo_servicio), function(respuesta){
        respuesta = JSON.parse(respuesta);
        if (respuesta.resultado == "ok") {
           $("#modalInsertarActualizar").modal("hide");
          notify("Éxito", "Se han actualizado los datos", "success");
          draw_tabla_tiposer();
          //document.location = "./?pagina=auditores";
        }
        else{
          notify("Error", respuesta.mensaje, "error");
        }
        
    });
}

 $( window ).load(function() {
    draw_tabla_tiposer();
    listener_btn_nuevo();
    listener_btn_guardar();
	listener_check_actualizar();
});
