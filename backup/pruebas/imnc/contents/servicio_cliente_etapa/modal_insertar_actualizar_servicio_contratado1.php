<!-- Modal insertar/actualizar-->
<div class="modal fade" id="modalInsertarActualizar" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="modalTitulo">Insertar/Actualizar</h4>
      </div>
      <div class="modal-body">
          <form id="demo-form2" data-parsley-validate="" class="" novalidate="" style="margin-top: -20px;">
            <div class="form-group form-vertical" style="display: none;">
              <label class="control-label col-md-12" for="txtClave">Clave<span class="required"></span>
              </label>
              <div class="col-md-12">
                <input type="text" id="txtClave" placeholder="asignado automáticamente" required="required" class="form-control col-md-7 col-xs-12" data-parsley-id="4103"><ul class="parsley-errors-list" id="parsley-id-4103"></ul>
              </div>
            </div>
            <div class="form-group form-vertical">
              <label class="control-label col-md-12" for="txtReferencia">Referencia <span class="required">*</span>
              </label>
              <div class="col-md-12">
                <input type="text" id="txtReferencia" required="required" class="form-control col-md-7 col-xs-12" data-parsley-id="4103" ><ul class="parsley-errors-list" id="parsley-id-4103"></ul>
              </div>
            </div>
            <div class="form-group form-vertical">
              <label class="control-label col-md-12" for="claveCliente">Cliente <span class="required">*</span>
              </label>
              <div class="col-md-12">
                <select class="form-control" id="claveCliente">
                  
                </select>
                <ul class="parsley-errors-list" id="parsley-id-2324"></ul>
              </div>
            </div>
            <div class="form-group form-vertical">
              <label class="control-label col-md-12" for="claveServicio">Servicio <span class="required">*</span>
              </label>
              <div class="col-md-12">
                <select class="form-control" id="claveServicio">
                  
                </select>
                <ul class="parsley-errors-list" id="parsley-id-2324"></ul>
              </div>
            </div>
			<div class="form-group form-vertical">
              <label class="control-label col-md-12" for="sel_tipoServicio">Tipo Servicio para generar referencia
              </label>
              <div class="col-md-12">
                <select class="form-control" id="sel_tipoServicio">
                  
                </select>
                <ul class="parsley-errors-list" id="parsley-id-2324"></ul>
              </div>
            </div>

            <div class="form-group form-vertical">
              <label class="control-label col-md-12" for="claveEtapaProceso">Trámite <span class="required">*</span>
              </label>
              <div class="col-md-12">
                <select class="form-control" id="claveEtapaProceso">
                  
                </select>
                <ul class="parsley-errors-list" id="parsley-id-2324"></ul>
              </div>
            </div>
			
			<!-- Modificacion para incluir fechas de la modificacion capturables -->
			<!--
			<div class="form-group form-vertical">
              <label class="control-label col-md-12 col-sm-4 col-xs-12">Fecha Cambio  <span class="required">*</span>
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input id="txtIni" class="date-picker form-control col-md-7 col-xs-12" required="required" type="text" placeholder="Formato: dd/mm/aaaa" data-inputmask="'mask': '99/99/9999'" data-parsley-id="4827"><ul class="parsley-errors-list" id="parsley-id-4827"></ul>
              </div>
            </div>
			-->
			<!-- Fin Modificacion para incluir fechas de la modificacion capturables -->
			<!--
			<div class="form-group form-vertical" id="campoResuelto">
              <label class="control-label col-md-12" id="lblResuelto">¿Resolver? <span class="required">*</span>
              </label>
              <div class="col-md-4 col-sm-6 col-xs-12">
                <select class="form-control" id="sgResuelto">

                </select>
              </div>
            </div>
			-->
            <div class="form-group form-vertical" id="campoReferenciaSeguimiento" hidden>
              <label class="control-label col-md-12" for="claveReferenciaSeguimiento">Referencia del Seguimiento<span class="required">*</span>
              </label>
              <div class="col-md-12">
                <select class="form-control" id="claveReferenciaSeguimiento">
                  
                </select>
                <ul class="parsley-errors-list" id="parsley-id-2324"></ul>
              </div>
            </div>

            <div class="form-group form-vertical" id="campoSgIntegral" style="display: none;">
              <label class="control-label col-md-12" id="lblIntegral">¿Es integral? <span class="required">*</span>
              </label>
              <div class="col-md-12">
                <select class="form-control" id="sgIntegral">

                </select>
              </div>
            </div>
             <div class="form-group form-vertical" id="campoDescripcion" style="display: none;">
              <label class="control-label col-md-12" for="txtDescripcion" >Descripción del Trámite<span class="required">*</span>
              </label>
              <div class="col-md-12" >
                <textarea rows="4" id="txtDescripcion" cols="50" type="text" required="required" class="form-control col-md-7 col-xs-12"  data-parsley-id="2324">
                </textarea>
                <ul class="parsley-errors-list" id="parsley-id-2324"></ul>
              </div>
            </div>
            <div class="form-group form-vertical">
              <label class="control-label col-md-12">¿Hay Cambio? <span class="required">*</span>
              </label>
              <div class="col-md-12">
                <select class="form-control" id="cambio">

                </select>
              </div>
            </div>

            <div id="cambioCheckbox" hidden>

            </div>
            <div id="cambioDescripcionForm">
               
            </div>
          </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" id="btnGuardar">Guardar</button>
      </div>
    </div>
  </div>
</div>
