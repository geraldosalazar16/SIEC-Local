// ================================================================================
// *****                        Al cargar la página                           *****
// ================================================================================
var cmb_list = {};
var etapa_seg = "38";

$( window ).load(function() {
    //draw_tabla_servicios();
    listener_btn_nuevo();
    listener_btn_guardar();
    listener_select_servicios_change();
    listener_btn_limpiar_filtros();
    listener_btn_filtrar();
    fill_checkbox_cambio();
    init_change_func();
	fill_cmb_sectores("TODOS");
	fill_cmb_cambio("elige");
});

// ================================================================================
// *****                       Funciones de uso común                         *****
// ================================================================================

function notify(titulo, texto, tipo) {
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

// ================================================================================
// *****                      Servicio - Cliente - Etapa                      *****
// ================================================================================
function init_change_func(){
  $('#claveEtapaProceso').change(function(){
	  //mostrar_ocultar_cambios($("#claveEtapaProceso").val());
	  valor_descripcion_tramite($("#claveEtapaProceso").val());
	  //genera la referencia si no es edicion
	  if ($("#btnGuardar").attr("accion") == "insertar")
	  {
		var etapa = $("#claveEtapaProceso").val();
		var tipo_servicio = $( "#sel_tipoServicio" ).val();
		generar_referencia("C1",etapa,tipo_servicio);
	  }
	  else
	  {
		  generar_referencia($("#txtReferencia").val(),$("#claveEtapaProceso").val(),$( "#sel_tipoServicio" ).val());
	  }
  });
}

function fill_cmb_clientes(seleccionado){
  $("#claveCliente").html('<option value="elige" selected disabled>-- elige una opción --</option>');
  $.getJSON(  global_apiserver + "/clientes/getAll/", function( response ) {
    $.each(response, function( indice, objTserv ) {
      $("#claveCliente").append('<option value="'+objTserv.ID+'">'+objTserv.NOMBRE+'</option>'); 
    });
    $("#claveCliente").val(seleccionado);
  });
}

function fill_cmb_sectores(seleccionado){
  $("#cmbSectoresIAF").html('<option value="TODOS" selected>-- elige una opción --</option>');
  $.getJSON(  global_apiserver + "/sectores/getAll/", function( response ) {
    $.each(response, function( indice, objTserv ) {
      $("#cmbSectoresIAF").append('<option value="'+objTserv.ID_SECTOR+'">'+objTserv.ID+'-'+objTserv.ID_TIPO_SERVICIO+'-'+objTserv.NOMBRE+'</option>'); 
    });
    $("#cmbSectoresIAF").val(seleccionado);
  });
}

function fill_cmb_servicios(seleccionado, etapa_proceso){
  var _etapa_proceso = etapa_proceso;
  $("#claveServicio").html('<option value="elige" selected disabled>-elige una opción-</option>');
  $.getJSON(  global_apiserver + "/servicios/getAll/", function( response ) {
    $.each(response, function( indice, objTserv ) {
      $("#claveServicio").append('<option value="'+objTserv.ID+'">'+objTserv.NOMBRE+'</option>'); 
    });
    $("#claveServicio").val(seleccionado);
    fill_cmb_etapas(_etapa_proceso, seleccionado);
    if ($("#claveServicio").val() == "CSG") {
      $("#campoSgIntegral").show();
    }
    else{
     $("#campoSgIntegral").hide(); 
    }
  });
}

function fill_cmb_etapas(seleccionado, id_servicio){
  $("#claveEtapaProceso").html('<option value="elige" selected disabled>-elige una opción-</option>');
  if ($("#btnGuardar").attr("accion") != "insertar")
  {
	  $.getJSON(  global_apiserver + "/etapas_proceso/getByIdServicio/?id="+id_servicio, function( response ) {
		$.each(response, function( indice, objTserv ) {
		  $("#claveEtapaProceso").append('<option value="'+objTserv.ID_ETAPA+'">'+objTserv.ETAPA+'</option>'); 
		});
		$("#claveEtapaProceso").val(seleccionado);
	  });   
  }
  else
  {
	$.getJSON(  global_apiserver + "/etapas_proceso/getIniciales/?id="+id_servicio, function( response ) {
		$.each(response, function( indice, objTserv ) {
		  $("#claveEtapaProceso").append('<option value="'+objTserv.ID_ETAPA+'">'+objTserv.ETAPA+'</option>'); 
		});
		$("#claveEtapaProceso").val(seleccionado);
	  });   
  }
}
function valor_descripcion_tramite(id_etapa){
  if(id_etapa!=null){
    $.getJSON(  global_apiserver + "/etapas_proceso/getByEtapa/?id="+id_etapa, function( response ) {

        $("#txtDescripcion").val(response);
        $("#txtDescripcion").attr('disabled','disabled');
        $("#campoDescripcion").show();
     }); 
  }else{
    $("#campoDescripcion").hide();
  }
}

function fill_cmb_sg(seleccionado){
    $("#lblIntegral").text("¿Es integral?");
    $("#sgIntegral").html('<option value="elige" selected disabled>-- elige una opción --</option>');
    $("#sgIntegral").append('<option value="S">Si</option>'); 
    $("#sgIntegral").append('<option value="N">No</option>'); 
    $("#sgIntegral").val(seleccionado);
}

function fill_cmb_tipo_servicio(seleccionado,servicio){
    $("#sel_tipoServicio").html('<option value="elige" selected disabled>-- elige una opción --</option>');
	$("#sel_tipoServicio").html('<option value="sin_asignar" selected disabled>-- Tipo de servicio no asignado --</option>');
	
	if(servicio == "elige" || !servicio)
	{
		$.getJSON(  global_apiserver + "/tipos_servicio/getAll/", function( response ) {
			$.each(response, function( indice, objTserv ) {
			$("#sel_tipoServicio").append('<option value="'+objTserv.ID+'">'+objTserv.NOMBRE+'</option>'); 
			});
			//Selecciona el valor que se pase por parámetro
			if(seleccionado == "" || !seleccionado) 
				seleccionado = "sin_asignar";
			$("#sel_tipoServicio").val(seleccionado);
		});		
	}
	else
	{
		$.getJSON(  global_apiserver + "/tipos_servicio/getByService/?id="+servicio, function( response ) {
			$.each(response, function( indice, objTserv ) {
			$("#sel_tipoServicio").append('<option value="'+objTserv.ID+'">'+objTserv.NOMBRE+'</option>'); 
			}); 
			//Selecciona el valor que se pase por parámetro
			if(seleccionado == "" || !seleccionado) 
				seleccionado = "sin_asignar";
			$("#sel_tipoServicio").val(seleccionado);
		});	
	}
}
function fill_cmb_documental(seleccionado){
    $("#lblIntegral").text("¿Es Documental o En sitio?");
    $("#sgIntegral").html('<option value="elige" selected disabled>-- elige una opción --</option>');
    $("#sgIntegral").append('<option value="S">Documental</option>'); 
    $("#sgIntegral").append('<option value="N">En Sitio</option>'); 
    $("#sgIntegral").val(seleccionado);
}

function fill_checkbox_cambio(){
  $.getJSON(  global_apiserver + "/servicio_cambio/getAll/", function( response ) {
    response.forEach(function(item, index){
      $("#cambioCheckbox").append("<div class='checkbox col-md-12' >"
      +" <label>"
      +"   <input type='checkbox' value='"+ item.ID +"' id='cmb-check-"+ item.ID +"'/> "
      + item.CAMBIO
      +" </label>"
      +"</div>");

      $("#cambioDescripcionForm").append("<div class='form-group form-vertical' id='campoDescripcionCambio-"+ item.ID +"' hidden>"
      +"<label class='control-label col-md-12' for='txtDescripcionCambio-"+ item.ID +"'>Descripción del Cambio "+ item.CAMBIO +"<span class='required'>*</span></label>"
      +"<div class='col-md-12' >"
      +"<textarea rows='4' id='txtDescripcionCambio-"+ item.ID +"' cols='50' type='text' required='required' class='form-control col-md-7 col-xs-12'></textarea>"
      +"</div>"
      +"</div>");

      $("#cmb-check-"+item.ID).change(item,function(event){
        if($(this).prop("checked")){
          if (cmb_list["cmb-check-"+ event.data.ID] != undefined && !cmb_list["cmb-check-"+ event.data.ID].NUEVO){
            var aux_id = cmb_list["cmb-check-"+ event.data.ID].ID;
            cmb_list["cmb-check-"+ event.data.ID] = {ID_CAMBIO : event.data.ID, CAMBIO: true, NUEVO: false, ID : aux_id};
          }
          else{
            cmb_list["cmb-check-"+ event.data.ID] = {ID_CAMBIO : event.data.ID, CAMBIO: true, NUEVO: true, ID : 0};
          }
          $("#campoDescripcionCambio-"+ event.data.ID).show();          
        }
        else{
          $("#campoDescripcionCambio-"+ event.data.ID).hide();
          $("#txtDescripcionCambio-"+ event.data.ID).val("");
          if (cmb_list["cmb-check-"+ event.data.ID] != undefined && !cmb_list["cmb-check-"+ event.data.ID].NUEVO){
            var aux_id = cmb_list["cmb-check-"+ event.data.ID].ID;
            cmb_list["cmb-check-"+ event.data.ID] = {ID_CAMBIO : event.data.ID, CAMBIO: false, NUEVO: false, ID : aux_id};
          }
          else{
            delete cmb_list["cmb-check-"+ event.data.ID];
          }
        }
      });
    });
  });
}
//funcion get by id cambios
function get_cambios_servicios(id_servicio){
  clean_checkbox_cambio();
  $.getJSON(  global_apiserver + "/servicio_cambio/getById/?id="+id_servicio, function( response ) {
    response.forEach(function(item,index){
      cmb_list["cmb-check-"+ item.ID_CAMBIO] = {ID_CAMBIO : item.ID_CAMBIO, CAMBIO: true, NUEVO: false, ID : item.ID};
      $("#cmb-check-"+item.ID_CAMBIO).prop("checked", true);
      $("#txtDescripcionCambio-"+item.ID_CAMBIO).val(item.DESCRIPCION);
      $("#campoDescripcionCambio-"+item.ID_CAMBIO).show();
    });
  });
}
//funcion insertar, borrar actualizar cambios
function actualizar_cambios(id_servicio){
  var cmb_insert = {
    "insert" : [], "update" : [] , "delete" : []
  };
  $.each(cmb_list,function(index,item){
    var aux = {
        ID : item.ID,
        ID_SERVICIO : id_servicio,
        ID_CAMBIO : item.ID_CAMBIO,
        DESCRIPCION : $("#txtDescripcionCambio-"+ item.ID_CAMBIO).val(),
        ID_USUARIO : sessionStorage.getItem("id_usuario")
    }
    if(item.NUEVO && item.CAMBIO){
      cmb_insert["insert"].push(aux);
    }
    else if(!item.NUEVO && item.CAMBIO){
      cmb_insert["update"].push(aux);
    }
    else if(!item.NUEVO && !item.CAMBIO){
      cmb_insert["delete"].push(aux);
    }
  });
    var cmb_post = [];
    if(cmb_insert["delete"].length > 0){
        cmb_post.push("delete");
    }
    if(cmb_insert["update"].length > 0){
      cmb_post.push("update");
    }
    if(cmb_insert["insert"].length > 0){
      cmb_post.push("insert");
    }
    for (var i = 0; i < cmb_post.length; i++) {
      $.post( global_apiserver + "/servicio_cambio/"+cmb_post[i]+"/", JSON.stringify(cmb_insert[cmb_post[i]]), function(respuesta){
          respuesta = JSON.parse(respuesta);
          if (respuesta.resultado == "ok") {
            console.log("cambio con exito");
          }
          else{
             notify("Error", respuesta.mensaje, "error");
          }
      });
    }
}

function clean_checkbox_cambio(){
  $("#cambioCheckbox").hide();
  $("input[id^='cmb-check-']").prop("checked", false);
  $("[id^='campoDescripcionCambio']").hide();
  $("[id^='txtDescripcionCambio']").val("");
  cmb_list = {};
}

function clear_modal_insertar_actualizar(){
  $("#campoDescripcion").hide();
  $("#txtClave").val("");
  $("#txtClave").removeAttr("readonly");
  //Prellenar el campo referencia
  generar_referencia("C1","XX","XXX");
  cambio_referencia = true;
  //$("#txtReferencia").removeAttr("readonly");
  //$("#txtReferencia").prop("readonly", false);
  fill_cmb_clientes("elige");
  fill_cmb_servicios("elige", "elige");
  $("#sel_tipoServicio").prop("disabled", false);
  fill_cmb_tipo_servicio("elige","elige");
  fill_cmb_sg("elige");
  //fill_cmb_resuelto("elige");
  $("#campoResuelto").hide();
  $("#txtIni").prop("disabled",true);
  //$("#sgResuelto").prop("disabled",true);
  $("#cambio").val("elige");
  
  //Oculta la seccion de cambios
  //document.getElementById("labCambio").style.display = 'none';
  $("#cambioCheckbox").hide();
  $("#cambioDescripcionForm").hide();
  
  //Controla el objeto fecha de cambio
  //fill_fecha_cambio("S","N");
		
  clean_checkbox_cambio();
  $("#claveEtapaProceso").attr('disabled','disabled');
  $("#claveCliente").prop("disabled", false);
  $("#claveServicio").prop("disabled", false);
  $("#claveEtapaProceso").prop("disabled", false);
  $("#txtDescripcion").val("");
  $("#claveReferenciaSeguimiento").val("");
  $("#campoReferenciaSeguimiento").hide();
  $("#claveReferenciaSeguimiento").html("");
}
function fill_cmb_cambio(seleccionado){
  $("#cambio").html('<option value="elige" disabled>--elige una opción--</option>');
  $("#cambio").append('<option value="S">Si</option>');
  $("#cambio").append('<option value="N">No</option>');
  $("#cambio").val(seleccionado);

  $("#cambio").change(function(){
    if($("#cambio").val()=='S'){
      $("#cambioCheckbox").show();
    }else{
      $.each(cmb_list,function(index,item){
        cmb_list[index].CAMBIO = false;
      });
      var aux = cmb_list;
      clean_checkbox_cambio();
      cmb_list = aux;
    }
  });
}
function generar_referencia(ref,etapa,tipo_servicio){
	if(!tipo_servicio)
	{
		tipo_servicio = "XXX";
	}
	if(!etapa)
	{
		etapa = "XX";
	}
	
	//ciclo = ref.substr(1,1);
	$.getJSON(  global_apiserver + "/tipos_servicio/generarReferencia/?ref="+ref+"&etapa="+etapa+"&id="+tipo_servicio, function( respuesta ) {
		//$("#txtReferencia").val(respuesta);
	});

}

function fill_modal_insertar_actualizar(id_servicio,id_alarma){
  $.getJSON(  global_apiserver + "/servicio_cliente_etapa/getById/?id="+id_servicio+"&domicilios=false", function( response ) {
        $("#txtClave").val(response.ID);
        $("#txtReferencia").val(response.REFERENCIA);
		//Insercion
		//$("#txtReferencia").prop("readonly", false);
				
        fill_cmb_clientes(response.ID_CLIENTE);
        fill_cmb_servicios(response.ID_SERVICIO,response.ID_ETAPA_PROCESO);
		fill_cmb_tipo_servicio(response.ID_TIPO_SERVICIO,response.ID_SERVICIO);
        valor_descripcion_tramite(response.ID_ETAPA_PROCESO);
		//fill_fecha_cambio(response.CapturaFechaCreacion,response.CapturaFechaModificacion);
		/*
        if(response.ID_ETAPA_PROCESO == etapa_seg){
          fill_cmb_referencia_seguimiento(response.ID_REFERENCIA_SEG, response.ID_CLIENTE);
          $("#campoReferenciaSeguimiento").show();
          fill_cmb_documental(response.SG_INTEGRAL);
        }
		else{
          $("#claveReferenciaSeguimiento").val("");
          $("#campoReferenciaSeguimiento").hide();
          
          $("#claveReferenciaSeguimiento").html(""); 
        }
		*/
		fill_cmb_sg(response.SG_INTEGRAL);
		//mostrar_ocultar_cambios(response.ID_ETAPA_PROCESO);
		//Oculto 
        $("#claveCliente").prop("disabled", true);
        $("#claveServicio").prop("disabled", true);
		$("#sel_tipoServicio").prop("disabled", true);
		
        if(response.CAMBIO =='S'){
          get_cambios_servicios(id_servicio);
          $("#cambioCheckbox").show();
        }else{
          clean_checkbox_cambio();
        }
     });
}
function mostrar_ocultar_cambios(id_etapa_proceso)
{
	//ocultar el check de cambios si es diferente de 
	if(id_etapa_proceso != 14)
	{
		//document.getElementById("labCambio").style.display = 'none';
		
		$("#cambioCheckbox").hide();
		$("#cambioDescripcionForm").hide();
	}
	else
	{
		//document.getElementById("labCambio").style.display = 'inline';
		$("#cambioCheckbox").show();
		//$("#cambio").hide();
	}
}
function listener_btn_filtrar(){
  $( "#btnFiltrar" ).click(function() {
      draw_fichas_con_filtro();
  });
}

function draw_row_servicio(objServicio){
  var strHtml = "";
  strHtml += '<tr class="even pointer">';
  strHtml += '  <td>'+objServicio.ID+'</td>';
  strHtml += '  <td>'+objServicio.REFERENCIA+'<br>';
  strHtml += '  <strong>'+objServicio.NOMBRE_CLIENTE+'</strong><br>';
  strHtml += '   <i>'+objServicio.NOMBRE_SERVICIO+'</i></td>';
  strHtml += '  <td>'+objServicio.NOMBRE_ETAPA+'</td>';
  if(objServicio.ID_ETAPA_PROCESO == etapa_seg){
    var auxText = objServicio.SG_INTEGRAL == 'S'? "Documental" : "En Sitio";
    strHtml += '  <td style="text-align: center;">'+ auxText  +'</td>';
  }
  else if (objServicio.ID_SERVICIO == "CSG" && objServicio.SG_INTEGRAL != null) {
    strHtml += '  <td style="text-align: center;">'+ objServicio.SG_INTEGRAL +'</td>';  
  }
  else{
    strHtml += '  <td style="text-align: center;"> -- </td>';
  }
  
  strHtml += '  <td>';
  if (global_permisos["SERVICIOS"]["editar"] == 1) {
      strHtml += '    <button type="button" class="btn btn-primary btn-xs btn-imnc btnEditar" id_servicio="'+objServicio.ID+'" id_alarma ="'+objServicio.ID_ALARMA+'" style="float: right;"> ';
    strHtml += '      <i class="fa fa-edit"> </i> Editar servicio contratado ';
    strHtml += '    </button>';
  }
  strHtml += '  </td>';
  strHtml += '  <td>';
  if (objServicio.ID_SERVICIO == "CSG") {
    var id = objServicio.ID
    if(objServicio.ID_ETAPA_PROCESO == etapa_seg){
      id = objServicio.ID_REFERENCIA_SEG;
    }
    strHtml += '    <a type="button" class="btn btn-primary btn-xs btn-imnc" href="./?pagina=sg_tipos_servicio&id_serv_cli_et='+ id +'" style="float: right;"> ';
    strHtml += '       <i class="fa fa-dot-circle-o" aria-hidden="true"></i> Ver detalles ';
    strHtml += '    </a>';
	strHtml += '    <a type="button" class="btn btn-primary btn-xs btn-imnc" href="./?pagina=ver_expediente&id='+ id +'&id_entidad=5" style="float: right;"> ';
    strHtml += '       <i class="fa fa-home" aria-hidden="true"></i> Ver expedientes ';
    strHtml += '    </a>';
  }
  else { // Actualmente solo están habilitados los sistemas de gestión 
    strHtml += '    <a type="button" class="btn btn-primary btn-xs btn-imnc" style="float: right;" disabled> ';
    strHtml += '       <i class="fa fa-dot-circle-o" aria-hidden="true"></i> Ver detalles ';
    strHtml += '    </a>';
  }
  strHtml += '  </td>';
  //Agregar botón para dar acceso al calendario
  strHtml += '  <td>';
  strHtml += '    <a type="button" class="btn btn-primary btn-xs btn-imnc" href="./?pagina=calendario_servicio&id_serv_cli_et='+ objServicio.ID + '" style="float: right;">';
    strHtml += '       <i class="fa fa-calendar" aria-hidden="true"></i> Ver Planificador ';
    strHtml += '    </a>';
	strHtml += '  </td>';
	/*
  strHtml += '  <td>';
  strHtml += '    <button type="button" class="btn btn-primary btn-xs btn-imnc btnVerPlanificador" id_servicio="'+objServicio.ID+'" style="float: right;"> ';
    strHtml += '      <i class="fa fa-edit"> </i> Ver Planificador ';
    strHtml += '    </button>';
   strHtml += '  </td>';
   //Fin modificacion agregar boton para acceder a calendario
  //Modificacion para que aparezcan las alarmas
  /*
  strHtml += '   <td>'+objServicio.ALARMA+'</td>'; 
  strHtml += '   <td>'+objServicio.DIAS_RESTANTES+'</td>'; 
  strHtml += '   <td>'+objServicio.FECHA_ALARMA+'</td>'; 
  strHtml += '   <td>'+objServicio.RESUELTO+'</td>';
  */
  //Fin Modificacion para que aparezcan las alarmas
  strHtml += '</tr>';
  return strHtml;
}

function draw_tabla_servicios(){
$.getJSON(global_apiserver + "/servicio_cliente_etapa/getAll/", function( response ) {
		console.log(response);
		document.getElementById("cantidad_servicios").innerText = 'Cantidad de servicios: '+response.length;
		$("#tbodyServicios").html(""); //esto limpia la tabla, le asigna codigo html al elemento
		$.each(response, function( index, objServicio ) { //para cada objeto tipo response devuelto por el json llamar a la funcion dibujar
		$("#tbodyServicios").append(draw_row_servicio(objServicio));		
		});
		listener_btn_editar();
		//Modificación para cambiar el color de la fila dependiendo de la alarma
		//Primero encuentro la celda que dice MEDIA, de ahi selecciono su fila y de ahí todas las celdas de esa fila
		//Creo que el problema es que el CSS del Boostrap me borra el backgroundcolor que le pongo a la fila
		//Alarma media
		/*
		$("#tbodyServicios").find("td:contains(MEDIA)").parent().find("td").each(function(){
			var div = $(this);
			$(div).css("backgroundColor","yellow");
		});
		//En tiempo
		$("#tbodyServicios").find("td:contains(EN TIEMPO)").parent().find("td").each(function(){
			var div = $(this);
			//Fondo verde lima
			$(div).css("backgroundColor","#32CD32");
			//Letra blanca
			$(div).css("color","white");
		});
		//Fuera de tiempo
		$("#tbodyServicios").find("td:contains(FUERA DE TIEMPO)").parent().find("td").each(function(){
			var div = $(this);
			$(div).css("backgroundColor","yellow");
		});
		*/
	});
}


function listener_btn_nuevo(){
  $( "#btnNuevo" ).click(function() {
    $("#btnGuardar").attr("accion","insertar");
    $("#modalTitulo").html("Insertar servicio");
    clear_modal_insertar_actualizar();
    $("#txtClave").attr("readonly","true");
    $("#modalInsertarActualizar").modal("show");
  });
}

function listener_btn_editar(){
  $( ".btnEditar" ).click(function() {
    $("#claveEtapaProceso").val("");
    $("#btnGuardar").attr("accion","editar");
    $("#txtClave").attr("readonly","true");
	var boton_guardar = $("#btnGuardar");
    boton_guardar.attr("id_servicio",$(this).attr("id_servicio"));
	boton_guardar.attr("id_alarma",$(this).attr("id_alarma"));
    $("#modalTitulo").html("Editar servicio");
    fill_modal_insertar_actualizar($(this).attr("id_servicio"),$(this).attr("id_alarma"));
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
function listener_select_servicios_change(){
  $( "#claveServicio" ).change(function() {
    fill_cmb_etapas("elige", $(this).val());
	fill_cmb_tipo_servicio("elige",$(this).val());
    $("#claveEtapaProceso").removeAttr('disabled');
    if ($("#claveServicio").val() == "CSG") {
      $("#txtDescripcion").attr('disabled','disabled');
      $("#campoSgIntegral").show();
    }
    else{
     $("#campoSgIntegral").hide(); 
      $("#campoDescripcion").hide();
    }
  });
}

$( "#sel_tipoServicio" ).change(function() {
	if ($("#btnGuardar").attr("accion") == "insertar")
	{
		generar_referencia("C1",$("#claveEtapaProceso").val(),$( "#sel_tipoServicio" ).val());
	}
});

function insertar(){
  var servicio = {
    ID_CLIENTE:$("#claveCliente").val(),
    ID_SERVICIO:$("#claveServicio").val(),
	ID_TIPO_SERVICIO:$("#sel_tipoServicio").val(),
    ID_ETAPA_PROCESO:$("#claveEtapaProceso").val(),
    SG_INTEGRAL:$("#sgIntegral").val(),
    REFERENCIA:$("#txtReferencia").val(),
    ID_USUARIO:sessionStorage.getItem("id_usuario"),
    CAMBIO:$("#cambio").val(),
    ID_REFERENCIA_SEG : $("#claveReferenciaSeguimiento").val()
  };

  $.post( global_apiserver + "/servicio_cliente_etapa/insert/", JSON.stringify(servicio), function(respuesta){
      respuesta = JSON.parse(respuesta);
      if (respuesta.resultado == "ok") {
        if(servicio.CAMBIO == 'S') { actualizar_cambios(respuesta.id); }
        $("#modalInsertarActualizar").modal("hide");
        notify("Éxito", "Se ha insertado un nuevo registro","success");
        draw_tabla_servicios();
        //document.location = "./?pagina=auditores";
      }
      else{
         notify("Error", respuesta.mensaje, "error");
      }
      //console.log("insertar: " + respuesta);
  });
}
function draw_fichas_con_filtro(){
    var filtros = {
      REFERENCIA:$("#txtFiltroReferencia").val(),
      REFERENCIA_CONTAINS:$("#txtFiltroReferenciaContains").val(),
      NOMBRE_CLIENTE:$("#txtFiltroNombreCliente").val(),
      NOMBRE_CLIENTE_CONTAINS:$("#txtFiltroNombreClienteContains").val(),
      NOMBRE_SERVICIO:$("#txtFiltroNombreServicio").val(),
      NOMBRE_SERVICIO_CONTAINS:$("#txtFiltroNombreServicioContains").val(),
	  ID_SECTOR: $("#cmbSectoresIAF").val()
    };
    $(".loading").show();
    //jQuery('html, body').animate({scrollTop : 0},500);
    $.post(global_apiserver + "/servicio_cliente_etapa/getByFiltro/", JSON.stringify(filtros), function(respuesta){
        response = JSON.parse(respuesta);
		document.getElementById("cantidad_servicios").innerText = 'Cantidad de servicios: '+response.length;
		console.log(response);
		$("#tbodyServicios").html("");
        $("#area_fichas").html("");
        if (response.length == 0) {
           $("#area_fichas").html("No se encontraron resultados");

        }
        $.each(response, function( index, objeto ) {
			console.log("for");
          $("#tbodyServicios").append(draw_row_servicio(objeto));  

        });
        listener_btn_editar();
        $(".loading").hide();
		//Alarma media
		$("#tbodyServicios").find("td:contains(MEDIA)").parent().find("td").each(function(){
			var div = $(this);
			$(div).css("backgroundColor","yellow");
		});
		//En tiempo
		$("#tbodyServicios").find("td:contains(EN TIEMPO)").parent().find("td").each(function(){
			var div = $(this);
			//Fondo verde lima
			$(div).css("backgroundColor","#32CD32");
			//Letra blanca
			$(div).css("color","white");
		});
    });
}
function editar(){
  var servicio = {
    ID:$("#txtClave").val(),
    ID_CLIENTE:$("#claveCliente").val(),
    ID_SERVICIO:$("#claveServicio").val(),
	ID_TIPO_SERVICIO:$("#sel_tipoServicio").val(),
    ID_ETAPA_PROCESO:$("#claveEtapaProceso").val(),
    SG_INTEGRAL:$("#sgIntegral").val(),
    REFERENCIA:$("#txtReferencia").val(),
    ID_USUARIO:sessionStorage.getItem("id_usuario"),
    CAMBIO:$("#cambio").val(),
	FECHA:$("#txtIni").val(),
	ID_ALARMA:$("#btnGuardar").attr("id_alarma"),
	RESUELTO:$("#sgResuelto").val(),
    ID_REFERENCIA_SEG : $("#claveReferenciaSeguimiento").val()
  };
    $.post( global_apiserver + "/servicio_cliente_etapa/update/", JSON.stringify(servicio), function(respuesta){
        respuesta = JSON.parse(respuesta);
        if (respuesta.resultado == "ok") {
            actualizar_cambios(servicio.ID);
            $("#modalInsertarActualizar").modal("hide");
            notify("Éxito", "Se han actualizado los datos","success");
            draw_tabla_servicios();
          //document.location = "./?pagina=auditores";
        }
        else{
           notify("Error", respuesta.mensaje, "error");
        }
        //console.log("insertar: " + respuesta.resultado);
    });
}


function listener_btn_limpiar_filtros(){
  $( "#btnLimpiarFiltros" ).click(function() {
    $(".input-filtro").val("");
    draw_tabla_servicios();
  });
}
