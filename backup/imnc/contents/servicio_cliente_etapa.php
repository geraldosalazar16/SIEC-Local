<div class="right_col" role="main">
  <div class="page-title">
    <div class="title_left">
      <?php
        if ($modulo_permisos["SERVICIOS"]["extraer"] == 1) {
            echo '<div class="dropdown" style="margin-bottom: 10px;">';
            echo '  <button class="btn btn-primary btn-xs dropdown-toggle" type="button" data-toggle="dropdown">';
            echo '  <i class="fa fa-cloud-download" aria-hidden="true"></i> Exportar todos';
            echo '  <span class="caret"></span></button>';
            echo '  <ul class="dropdown-menu">';
            echo '    <li><a href="./generar/csv/servicio_cliente_etapa/" target="_blank">CSV</a></li>';
            echo '  </ul>';
            echo '</div>';
        } 
      ?>
      
    </div>
  </div>

  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
        <p><h2>Servicios contratados</h2></p>
        <?php
          if ($modulo_permisos["SERVICIOS"]["registrar"] == 1) {
              echo '<p>';
              echo '  <button type="button" id="btnNuevo" class="btn btn-primary btn-xs btn-imnc" style="float: right;"> ';
              echo '    <i class="fa fa-plus"> </i> Agregar servicio contratado ';
              echo '  </button>';
              echo '</p>';
          } 
        ?>
        
          <div class="clearfix"></div>
        </div>

        <div class="x_content">
        <div class="col-md-12">
            <form class="form-horizontal form-label-left ng-pristine ng-valid">
                  

				 <div class="form-group col-md-4">
                    <label>Por referencia: </label>
                    <div class="input-group" style="width: 100%;">
                         <input type="text" class="form-control input-filtro" id="txtFiltroReferencia">
                          <!-- insert this line -->
                          <span class="input-group-addon" style="width:0px; padding-left:0px; padding-right:0px; border:none;"></span>
                          <select id="txtFiltroReferenciaContains" class="form-control" style="font-size: 10px;">
                              <option value="" selected>Comienza con</option>
                              <option value="1">Contenido en</option>
                          </select>
                    </div>
                  </div>
				 
				 <div class="form-group col-md-4">
                    <label>Nombre cliente: </label>
                    <div class="input-group" style="width: 100%;">
                          <input type="text" class="form-control input-filtro" id="txtFiltroNombreCliente">
                          <!-- insert this line -->
                          <span class="input-group-addon" style="width:0px; padding-left:0px; padding-right:0px; border:none;"></span>
                          <select id="txtFiltroNombreClienteContains" class="form-control" style="font-size: 10px;">
                              <option value="" selected>Comienza con</option>
                              <option value="1">Contenido en</option>
                          </select>
                    </div>
                  </div>
                 <div class="form-group col-md-4">
                    <label>Nombre de servicio: </label>
                    <div class="input-group" style="width: 100%;">
                          <input type="text" class="form-control input-filtro" id="txtFiltroNombreServicio">
                          <!-- insert this line -->
                          <span class="input-group-addon" style="width:0px; padding-left:0px; padding-right:0px; border:none;"></span>
                          <select id="txtFiltroNombreServicioContains" class="form-control" style="font-size: 10px;">
                              <option value="" selected>Comienza con</option>
                              <option value="1">Contenido en</option>
                          </select>
                    </div>
                  </div>
				  <div class="form-group col-md-4">
                    <label>Sector IAF: </label>
                    <div class="input-group" style="width: 100%;">
                          <select id="cmbSectoresIAF" class="form-control">
                          </select>
                    </div>
                  </div>
                
				
			</form>
        </div>
              <div class="form-group">
                <div class="col-md-3 col-sm-3 col-xs-12 col-md-offset-9">
                  <button type="button" class="btn btn-success" id="btnLimpiarFiltros">Ver todos</button>
                  <button type="button" class="btn btn-primary" id="btnFiltrar">Filtrar</button>
                </div>
              </div>
          
        </div>
      </div>
	  <div class="row">
		<p id="cantidad_servicios">
		
		</p>
	  </div>
      <div class="row">
            <div class="col-md-12">
              <div class="x_panel">
                <div class="x_content">

                  <div class="row">
                    <div class="clearfix"></div>
                    <table class="table table-striped responsive-utilities jambo_table bulk_action">
                      <thead>
                        <tr class="headings">
                          <th class="column-title">ID</th>
                          
                          <th class="column-title">Referencia, cliente y servicio</th>
                          <th class="column-title">Trámite</th>
                          <th class="column-title">SG Integral</th>
                          <th class="column-title"></th>
                          <th class="column-title"></th>
                          
                        </tr>
                      </thead>

                      <tbody id="tbodyServicios">

                      </tbody>

                    </table>
                  </div>

                </div>
              </div>
            </div>
          </div>
    </div>
  </div>
</div>

<?php 
  include "servicio_cliente_etapa/modal_insertar_actualizar_servicio_contratado.php";
?>