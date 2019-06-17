import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  constructor() { }

  ngOnInit() {
    this.dtOptions = {
      ajax: 'api/productos',
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
        data : "action",orderable:false, searchable:false
      }]
    };
  }

}
