<div class="right_col" role="main">
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
        <p><h2>Tipos de servicio</h2></p>
        <?php
          if ($modulo_permisos["SERVICIOS"]["catalogos"] == 1) {
              echo '<p>';
              echo '  <button type="button" id="btnNuevo" class="btn btn-primary btn-xs btn-imnc" style="float: right;"> ';
              echo '    <i class="fa fa-plus"> </i> Agregar tipo de servicio';
              echo '  </button>';
              echo '</p>';
          } 
        ?>
        
          <div class="clearfix"></div>
        </div>

        <div class="x_content">

          <table class="table table-striped responsive-utilities jambo_table bulk_action">
            <thead>
              <tr class="headings">
                <!--<th>
                  <input type="checkbox" id="check-all" class="flat">
                </th>-->
                <th class="column-title" style="width: 420px;">Clave y nombre de tipo de servicio</th>
                <th class="column-title" style="width: 290px;">Norma</th>
                <th class="column-title">Servicio</th>
                <th class="column-title">Comienza</th>
                <th class="column-title">Termina</th>
                <th class="column-title"></th>
              </tr>
            </thead>

            <tbody id="tbodyServT">

            </tbody>

          </table>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Modal insertar/actualizar-->
<div class="modal fade" id="modalInsertarActualizar" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="modalTitulo">Insertar/Actualizar</h4>
      </div>
      <div class="modal-body">
          <form id="demo-form2" data-parsley-validate="" class="form-horizontal form-label-left" novalidate="">
            <div class="form-group">
              <label class="control-label col-md-4 col-sm-4 col-xs-12" for="txtClave">Clave de tipo de servicio <span class="required">*</span>
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input type="text" id="txtId" required="required" class="form-control col-md-7 col-xs-12" data-parsley-id="4103"><ul class="parsley-errors-list" id="parsley-id-4103"></ul>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-4 col-sm-4 col-xs-12" for="txtClave">Nombre de tipo de servicio <span class="required">*</span>
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input type="text" id="txtNombre" required="required" class="form-control col-md-7 col-xs-12" data-parsley-id="4103"><ul class="parsley-errors-list" id="parsley-id-4103"></ul>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-4 col-sm-4 col-xs-12" for="txtRfc">Clave de norma  <span class="required">*</span>
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <select class="form-control" id="cmbIdN">
                  
                </select>
                <ul class="parsley-errors-list" id="parsley-id-2324"></ul>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-4 col-sm-4 col-xs-12" for="txtRfc">Clave de servicio  <span class="required">*</span>
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <select class="form-control" id="cmbIdS">
                  
                </select>
                <ul class="parsley-errors-list" id="parsley-id-2324"></ul>
              </div>
            </div>
            
            <div class="form-group">
              <label class="control-label col-md-4 col-sm-4 col-xs-12">Fecha de inicio  <span class="required">*</span>
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input id="txtIni" class="date-picker form-control col-md-7 col-xs-12" required="required" type="text" placeholder="Formato: dd/mm/aaaa" data-inputmask="'mask': '99/99/9999'" data-parsley-id="4827"><ul class="parsley-errors-list" id="parsley-id-4827"></ul>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-md-4 col-sm-4 col-xs-12">Fecha de fin <span class="required">*</span>
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input id="txtTer" class="date-picker form-control col-md-7 col-xs-12" required="required" type="text" placeholder="Formato: dd/mm/aaaa" data-inputmask="'mask': '99/99/9999'" data-parsley-id="4827"><ul class="parsley-errors-list" id="parsley-id-4827"></ul>
              </div>
            </div>
			<div class="form-group" id="divcheckactualizar">
              <label class="control-label col-md-4 col-sm-4 col-xs-12">¿Es actualización?
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <input type="checkbox" class="form-control col-md-7 col-xs-12 selector noshadow" id="checkactualizacion" data-parsley-id="2324" ><ul class="parsley-errors-list" id="parsley-id-2324"></ul>
              </div>
            </div>
			<div class="form-group" id="divactualizar" hidden>
              <label class="control-label col-md-4 col-sm-4 col-xs-12">Copiar los sectores de :
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                 <select class="form-control" id="cmbCopiaServicio">
                  
                </select>
              </div>
            </div>
			<div class="form-group" id="divactualizaranio" hidden>
              <label class="control-label col-md-4 col-sm-4 col-xs-12">Año :
              </label>
              <div class="col-md-6 col-sm-6 col-xs-12">
                 <input type="text" id="txtAnio" class="form-control col-md-7 col-xs-12" data-parsley-id="4103"><ul class="parsley-errors-list" id="parsley-id-4103"></ul>
              </div>
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
