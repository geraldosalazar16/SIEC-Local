app.controller('auditores_agenda_general_controller',['$scope','$http' ,function($scope,$http){
    cargarEventos();
    function setCalendar(eventos) {
        moment.locale('es');
        var calendar = $('#calendario').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listWeek'
            },
            defaultView: 'agendaDay',
            locale: 'es',
            navLinks: true,
            editable: true,
            eventLimit: true,
            eventClick: function (calEvent, jsEvent, view) {
                if (calEvent.tipo == 'Evento') {
                    notify('Evento',calEvent.descripcion,'info');
                }
            },
            events: eventos            
        });
        $('#calendario').fullCalendar( 'today' );
    }
    function cargarEventos () {
        var eventos = [];
        var filtros = {
			TIPO_SERVICIO:"",
			SECTOR:"",
			REFERENCIA:"",
			CLIENTE:""
		};
        $http.post(  global_apiserver + "/sg_auditorias/getFechas/",JSON.stringify(filtros))
            .then(function( response ) {//se ejecuta cuando la petición fue correcta
                $.each(response.data.FECHAS, function( indice, objAuditoria ) {
                    if (objAuditoria.FECHA_AUDITORIA !== null) {
                        var f_ini= objAuditoria.FECHA_AUDITORIA;
                        var anhio_ini = parseInt(f_ini.substring(0,4));
                        var mes_ini = parseInt(f_ini.substring(4,6))-1; //En js los meses comienzan en 0
                        var dia_ini = parseInt(f_ini.substring(6,8));
                        
                        eventos.push(
                            {
                                title: 'Ref: ' + objAuditoria.REFERENCIA + " (" + objAuditoria.ID_TIPO_SERVICIO + ")",
                                start: new Date(anhio_ini, mes_ini, dia_ini, 07, 0),
                                end: new Date(anhio_ini, mes_ini, dia_ini, 18, 30),
                                allDay: false,
                                color: "#3e5a23",
                                url: './?pagina=sg_tipos_servicio&id_serv_cli_et='+objAuditoria.ID_SERVICIO_CLIENTE_ETAPA +'&sg_tipo_servicio='+objAuditoria.ID_SG_TIPO_SERVICIO,
                                tipo: 'Auditoria'
                            }
                        )
                    }
                });
                //Ahora cargo los eventos
                $http.get(  global_apiserver + "/personal_tecnico_eventos/getAll/")
                .then(function( response ) {//se ejecuta cuando la petición fue correcta
                    $.each(response.data, function( indice, evento ) {
                        var f_ini= evento.FECHA_INICIO;
                        var anhio_ini = parseInt(f_ini.substring(0,4));
                        var mes_ini = parseInt(f_ini.substring(5,7))-1; //En js los meses comienzan en 0
                        var dia_ini = parseInt(f_ini.substring(8,10));

                        var f_fin= evento.FECHA_FIN;
                        var anhio_fin = parseInt(f_fin.substring(0,4));
                        var mes_fin = parseInt(f_fin.substring(5,7))-1; //En js los meses comienzan en 0
                        var dia_fin = parseInt(f_fin.substring(8,10));
                
                        const tipo = 'Evento';

                        const start = new Date(anhio_ini, mes_ini, dia_ini, 07, 0);
                        const end = new Date(anhio_fin, mes_fin, dia_fin, 18, 30);
                        var descripcion = evento.NOMBRE+' '+evento.APELLIDO_PATERNO+' : '+evento.EVENTO; 

                        eventos.push(
                            {
                            title: evento.EVENTO,
                            start: start,
                            end: end,
                            color: '#8AECFA',
                            allDay: false,
                            descripcion: descripcion,
                            tipo: tipo,
                            fecha_inicio: evento.FECHA_INICIO,
                            fecha_fin: evento.FECHA_FIN,
                            id_evento: evento.ID,
                            }
                        ) 
                    });
                    setCalendar(eventos);
                },
                function (response){}
                );
            },
            function (response){}
        );	
    }
}]);
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