app.controller('dashboard_controller', ['$scope', function($scope,$http) { 
var origeng = document.getElementById("origenChart");
var estatusg = document.getElementById("estatusChart");
var competenciag = document.getElementById("competenciaChart");
var entidadg = document.getElementById("entidadChart");
var origengu = document.getElementById("origenChartU");
var estatusgu = document.getElementById("estatusChartU");
var competenciagu = document.getElementById("competenciaChartU");
var entidadgu = document.getElementById("entidadChartU");
var origen = [];
var cantidadOrigen = [];
var estatus = [];
var cantidadEstatus = [];
var competencia = [];
var cantidadCompetencia = [];
var entidad = [];
var cantidadEntidad= [];

var origenU = [];
var cantidadOrigenU = [];
var estatusU = [];
var cantidadEstatusU = [];
var competenciaU = [];
var cantidadCompetenciaU = [];
var entidadU = [];
var cantidadEntidadU= [];
	
$scope.calcular_hit_rate_valor_certificaciones = function(){
	var datos = {
		f_ini : $("#fecha_inicio_cert").val(),
		f_fin : $("#fecha_fin_cert").val()
	}
	alert('En desarrollo');
	/*
	$.post(global_apiserver + "/reporte/hitRateValorCertificaciones/", JSON.stringify(datos), function(response){
		respuesta = JSON.parse(response);
		if (respuesta.resultado == "ok") {

			notify_success("Éxito", "Se ha insertado la tarea");
		}
		else{
			notify("Error", respuesta.mensaje, "error");
		}
	});
	*/
}
$scope.calcular_hit_rate_valor_recertificaciones = function(){
	var datos = {
		f_ini : $("#fecha_inicio_rec").val(),
		f_fin : $("#fecha_fin_rec").val()
	}
//	alert('En desarrollo');
	
	$.post(global_apiserver + "/reporte/hitRateValorRecertificaciones/", JSON.stringify(datos), function(response){
		respuesta = JSON.parse(response);
		if (respuesta.resultado == "ok") {
			$scope.contratos_nuevos_recertificacion = 	respuesta.recertificaciones;
			$scope.ofertas_nuevas_recertificacion	=	respuesta.cotizaciones;
			if(respuesta.cotizaciones!=0){
				$scope.hit_rate_valor_recertificacion	=	respuesta.recertificaciones/respuesta.cotizaciones;
			}
			else{
				$scope.hit_rate_valor_recertificacion	=	"Cotizaciones no puede tener valor 0";
			}
			$scope.$apply();
			notify("Éxito", "Resultaos obtenidos");
		}
		else{
			notify("Error", respuesta.mensaje, "error");
		}
	});
	
}
$scope.graficaOrigen = function(){
	$.ajax({
		type:'GET',
		dataType: 'json',
		url:global_apiserver+"/reporte/getCantidadOrigen/",
		success:function(data){
			for(var i = 0 ; i < data.length ; i++){
				origen[i] = data[i].ORIGEN;
				cantidadOrigen[i] = data[i].CONTADOR;
			}
			var mybarChart = new Chart(origeng, {
				type: 'bar',
				data: {
					labels: origen,
					datasets: [{
						label: 'cantidad',
						backgroundColor: "#26B99A",
						data: cantidadOrigen
					}]
				},

				options: {
					scales: {
						xAxes: [{
							stacked: true,
							ticks: {
								autoSkip: false
							}
						}],
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]	
					}
				}
			});
		}
	});
};

$scope.graficaEstatus= function(){
	$.ajax({
		type:'GET',
		dataType: 'json',
		url:global_apiserver+"/reporte/getCantidadEstatusSeguimiento/",
		success:function(data){
			for(var i = 0 ; i < data.length ; i++){
				estatus[i] = data[i].ESTATUS_SEGUIMIENTO;
				cantidadEstatus[i] = data[i].CONTADOR;
			}
			var mybarChart = new Chart(estatusg, {
				type: 'bar',
				data: {
					labels: estatus,
					datasets: [{
						label: 'cantidad',
						backgroundColor: "#26B99A",
						data: cantidadEstatus
					}]
				},

				options: {
					scales: {
						xAxes: [{
							stacked: true,
							ticks: {
								autoSkip: false
							}
						}],
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]	
					}
				}
			});
		}
	});
};

$scope.graficaCompetencia = function(){
	$.ajax({
		type:'GET',
		dataType: 'json',
		url:global_apiserver+"/reporte/getCantidadCompetencia/",
		success:function(data){
			for(var i = 0 ; i < data.length ; i++){
				competencia[i] = data[i].COMPETENCIA;
				cantidadCompetencia[i] = data[i].CONTADOR;
			}
			var width = data.length*7;
			$("#competenciadivwidth").css("width",width+"%");
			var mybarChart = new Chart(competenciag, {
				
				type: 'bar',
				data: {
					labels: competencia,
					datasets: [{
						
						label: 'cantidad',
						backgroundColor: "#26B99A",
						data: cantidadCompetencia,
					}]
				},
				
				options: {
					
					responsive: true,
					scales: {
						xAxes: [{
							stacked: true,
							ticks: {
								autoSkip: false
							}
						}],
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]	
					}
				}
			});
			
		}
	});
	
};

$scope.graficaEntidad = function(){
	$.ajax({
		type:'GET',
		dataType: 'json',
		url:global_apiserver+"/reporte/getCantidadEntidad/",
		success:function(data){
			for(var i = 0 ; i < data.length ; i++){
				entidad[i] = data[i].ENTIDAD_FEDERATIVA;
				cantidadEntidad[i] = data[i].CONTADOR;
			}
			var width = data.length*7;
			$("#entidaddivwidth").css("width",width+"%");
			var mybarChart = new Chart(entidadg, {
				
				type: 'bar',
				data: {
					labels: entidad,
					datasets: [{
						
						label: 'cantidad',
						backgroundColor: "#26B99A",
						data: cantidadEntidad,
					}]
				},
				
				options: {
					
					responsive: true,
					scales: {
						xAxes: [{
							stacked: true,
							ticks: {
								autoSkip: false
							}
						}],
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]	
					}
				}
			});
			
		}
	});
	
};







$scope.graficaOrigenU = function(){
	$.ajax({
		type:'GET',
		dataType: 'json',
		url:global_apiserver+"/reporte/getCantidadOrigen/?usuario="+sessionStorage.getItem("id_usuario"),
		success:function(data){
			for(var i = 0 ; i < data.length ; i++){
				origenU[i] = data[i].ORIGEN;
				cantidadOrigenU[i] = data[i].CONTADOR;
			}
			var mybarChart = new Chart(origengu, {
				type: 'bar',
				data: {
					labels: origen,
					datasets: [{
						label: 'cantidad',
						backgroundColor: "#26B99A",
						data: cantidadOrigenU
					}]
				},

				options: {
					scales: {
						xAxes: [{
							stacked: true,
							ticks: {
								autoSkip: false
							}
						}],
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]	
					}
				}
			});
		}
	});
};

$scope.graficaEstatusU= function(){
	$.ajax({
		type:'GET',
		dataType: 'json',
		url:global_apiserver+"/reporte/getCantidadEstatusSeguimiento/?usuario="+sessionStorage.getItem("id_usuario"),
		success:function(data){
			for(var i = 0 ; i < data.length ; i++){
				estatusU[i] = data[i].ESTATUS_SEGUIMIENTO;
				cantidadEstatusU[i] = data[i].CONTADOR;
			}
			var mybarChart = new Chart(estatusgu, {
				type: 'bar',
				data: {
					labels: estatus,
					datasets: [{
						label: 'cantidad',
						backgroundColor: "#26B99A",
						data: cantidadEstatusU
					}]
				},

				options: {
					scales: {
						xAxes: [{
							stacked: true,
							ticks: {
								autoSkip: false
							}
						}],
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]	
					}
				}
			});
		}
	});
};

$scope.graficaCompetenciaU = function(){
	$.ajax({
		type:'GET',
		dataType: 'json',
		url:global_apiserver+"/reporte/getCantidadCompetencia/?usuario="+sessionStorage.getItem("id_usuario"),
		success:function(data){
			for(var i = 0 ; i < data.length ; i++){
				competenciaU[i] = data[i].COMPETENCIA;
				cantidadCompetenciaU[i] = data[i].CONTADOR;
			}
			var width = data.length*7;
			$("#competenciadivwidthu").css("width",width+"%");
			var mybarChart = new Chart(competenciagu, {
				
				type: 'bar',
				data: {
					labels: competencia,
					datasets: [{
						
						label: 'cantidad',
						backgroundColor: "#26B99A",
						data: cantidadCompetenciaU,
					}]
				},
				
				options: {
					
					responsive: true,
					scales: {
						xAxes: [{
							stacked: true,
							ticks: {
								autoSkip: false
							}
						}],
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]	
					}
				}
			});
			
		}
	});
	
};

$scope.graficaEntidadU = function(){
	$.ajax({
		type:'GET',
		dataType: 'json',
		url:global_apiserver+"/reporte/getCantidadEntidad/?usuario="+sessionStorage.getItem("id_usuario"),
		success:function(data){
			for(var i = 0 ; i < data.length ; i++){
				entidadU[i] = data[i].ENTIDAD_FEDERATIVA;
				cantidadEntidadU[i] = data[i].CONTADOR;
			}
			var width = data.length*7;
			$("#entidaddivwidthu").css("width",width+"%");
			var mybarChart = new Chart(entidadgu, {
				
				type: 'bar',
				data: {
					labels: entidad,
					datasets: [{
						
						label: 'cantidad',
						backgroundColor: "#26B99A",
						data: cantidadEntidadU,
					}]
				},
				
				options: {
					
					responsive: true,
					scales: {
						xAxes: [{
							stacked: true,
							ticks: {
								autoSkip: false
							}
						}],
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]	
					}
				}
			});
			
		}
	});
	
};
function onCalendar()
{
	$('#fecha_inicio').datepicker({
        dateFormat: "mm/dd/yy",
        onSelect: function (dateText, ins) {
            $scope.fecha_inicio = dateText;
        }
    }).css("display", "inline-block");
				
	$('#fecha_fin').datepicker({
        dateFormat: "mm/dd/yy",
        onSelect: function (dateText, ins) {
			$scope.fecha_fin = dateText;
        }
    }).css("display", "inline-block");
    
    
	/*///////////////////////////////////////////////////*/
	$('#fecha_inicio_cert').datepicker({
        dateFormat: "yy-mm-dd",
		onSelect: function (dateText, ins) {
            $scope.fecha_inicio_cert = dateText;
        }
    }).css("display", "inline-block");
				
	$('#fecha_fin_cert').datepicker({
        dateFormat: "yy-mm-dd",
        onSelect: function (dateText, ins) {
			$scope.fecha_fin_cert = dateText;
        }
    }).css("display", "inline-block");
	$('#fecha_inicio_rec').datepicker({
        dateFormat: "yy-mm-dd",
        onSelect: function (dateText, ins) {
            $scope.fecha_inicio_rec1 = dateText;
        }
    }).css("display", "inline-block");
				
	$('#fecha_fin_rec').datepicker({
        dateFormat: "yy-mm-dd",
        onSelect: function (dateText, ins) {
			$scope.fecha_fin_rec = dateText;
        }
    }).css("display", "inline-block");
	/*///////////////////////////////////////////////////*/
}

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


$scope.graficaOrigen();
$scope.graficaEstatus();
$scope.graficaEntidad();

$scope.graficaCompetenciaU();
$scope.graficaOrigenU();
$scope.graficaEstatusU();
$scope.graficaEntidadU();
onCalendar();
}]);