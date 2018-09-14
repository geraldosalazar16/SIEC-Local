<span ng-controller="ec_tipos_servicio_controller">
<div class="right_col" role="main" >
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
        <p><h2>{{titulo}}</h2></p>
       
         
              <p ng-if='modulo_permisos["catalogos"] == 1'>
				<button type="button" id="btnNuevo" ng-click="agregar_info_auditoria()" class="btn btn-primary btn-xs btn-imnc" style="float: right;"> 
					<i class="fa fa-plus"> </i> {{titulo_boton_info_auditoria}}
				</button>';
              </p>
           
        
        
          <div class="clearfix"></div>
        </div>

        <div class="x_content">
			
				<ul class="list-unstyled user_data">
					<li ><b>
					Cliente:<i> {{DatosServicio.NOMBRE_CLIENTE}}</i></b>
					</li>

					<li ><b>
					Servicio: <i> {{DatosServicio.NOMBRE_SERVICIO}}</i></b>
					</li>

					<li ><b>
					Tr&aacutemite: <i> {{DatosServicio.NOMBRE_ETAPA}}</i></b>
					</li>
	
					<li ><b>
					Referencia: <i> {{DatosServicio.REFERENCIA}}</i></b>
					</li>

				</ul>
			
				
				
				<div class="" role="tabpanel" data-example-id="togglable-tabs">
							<ul id="myTab" class="nav nav-tabs bar_tabs" role="tablist">
								<li role="presentation" class="active">
									<a href="#tab_informacion" id="tab_informacion-tab"  role="tab" data-toggle="tab" aria-expanded="true" ng-click="DatosInformacion()">
                          			Informacion</a>
								</li>
								
								<li role="presentation" class="" ng-if="DatosServicio.ID_SERVICIO == 1">
									<a href="#tab_sectores" id="tab_sectores-tab"  role="tab"  data-toggle="tab" aria-expanded="false">
									Sectores</a>
								</li>						
								
								<li role="presentation" class="" ng-if="DatosServicio.ID_SERVICIO == 1">
								<a href="#tab_sitios" id="tab_sitios-tab"  role="tab" data-toggle="tab" aria-expanded="true" >
                          			Sitios</a>
								</li>
								
								<li role="presentation" class="" ng-if="DatosServicio.ID_SERVICIO == 1">
								<a href="#tab_auditorias" id="tab_auditorias-tab"  role="tab" data-toggle="tab" aria-expanded="true" >
                          			Auditorias</a>
								</li>
								
							</ul>
							<div id="myTabContent" class="tab-content">
								<div role="tabpanel" class="tab-pane fade active in" id="tab_informacion" aria-labelledby="home-tab">
									<ul class="list-unstyled user_data">
										<li ng-repeat="x in ValoresMetaDatos">
											{{x.NOMBRE_META_SCE}} :<i> {{x.VALOR}}</i>
										</li>
									</ul>
								</div>
								<div role="tabpanel" class="tab-pane fade" id="tab_sectores" aria-labelledby="profile-tab"	ng-if="DatosServicio.ID_SERVICIO == 1">
									<div class="x_title">
										<p><h2>Sectores del servicio</h2></p>
											<p ng-if='modulo_permisos["registrar"] == 1'>
											<button type="button" ng-click="agregar_sector()" class="btn btn-primary btn-xs btn-imnc" style="float: right;"> 
												<i class="fa fa-plus"> </i> Agregar sector 
											</button>';
										</p>
										<div class="clearfix"></div>
								</div>
								<table class="table table-striped responsive-utilities jambo_table bulk_action">
									<thead>
										<tr class="headings">
											<th class="column-title">Clave del sector</th>
											<th class="column-title">Nombre del sector</th>
											<th class="column-title">Principal</th>
											<th class="column-title"></th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td></td>
											<td></td>
											<td></td>
											<td>
												<p ng-if='modulo_permisos["registrar"] == 1'>
													<button type="button"  ng-click="editar_sector()" class="btn btn-primary btn-xs btn-imnc" style="float: right;"> 
														<i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar sector 
													</button>';
												</p>
											</td>
										</tr>
									</tbody>
								</table>
								</div>
								<div role="tabpanel" class="tab-pane fade" id="tab_sitios" aria-labelledby="profile-tab" ng-if="DatosServicio.ID_SERVICIO == 1">
									<p>234</p>
								</div>
								<div role="tabpanel" class="tab-pane fade" id="tab_auditorias" aria-labelledby="profile-tab" ng-if="DatosServicio.ID_SERVICIO == 1">
									<p>345</p>
								</div>
							<div>							

								
				
        </div>
      </div>
    </div>
  </div>
 </div> 
 <?php 
  include "ec_tipos_servicio/modal_agregar_informacion_auditoria.php";
?>
</span>