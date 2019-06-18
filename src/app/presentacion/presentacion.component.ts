import { Component, OnInit } from '@angular/core';
//To aactivate the route and get the parameter
import { ActivatedRoute } from '@angular/router';
//import the model
import { Producto } from '../producto/producto';
//import the service task
import { ProductoService } from '../producto/producto.service';

@Component({
  selector: 'app-presentacion',
  templateUrl: './presentacion.component.html',
  styleUrls: ['./presentacion.component.css']
})
export class PresentacionComponent implements OnInit {
	dtOptions: DataTables.Settings = {};

  constructor() { }

  ngOnInit() {
  	this.dtOptions = {
      ajax: 'api/presentaciones',
      columns: [{
        title: 'Id',
        data: 'id'
      }, {
        title: 'Nombre',
        data: 'nombre'
      }, {
        title: 'Descripción',
        data: 'descripcion'
      }, {
        title: "Presentación",
        data: "nombre_presen"
      }, {
        title: "Cantidad",
        data: "cantidad_presen"
      }, {
        title: "Unidad de Medida",
        data: "unidad_presen"
      }, {
        title: "Precio",
        data: "precio_presen"
      }, {
      	title: "Opciones",
        data : "action"//,orderable:false, searchable:false
      }]
    };
  }

  deletePresentacion(){
  	console.log("eliminar presentacion")
  }

  edit(){
  	console.log("editar")
  }

}
