import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
	dtOptions: DataTables.Settings = {};

  constructor() { }

  ngOnInit() {
  	this.dtOptions = {
      ajax: 'api/categorias',
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
      	title: "Opciones",
        data : "action",orderable:false, searchable:false
      }]
    };
  }

}
