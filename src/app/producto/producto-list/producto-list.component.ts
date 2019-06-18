import { Component, OnInit } from '@angular/core';
//import the model
import { Producto } from '../Producto';
//import the service producto
import { ProductoService } from '../producto.service';
//import the service message
import { MessageProductoService } from '../message-producto.service';
//To get the response from the server
import { Observable } from 'rxjs';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css']
})
export class ProductoListComponent implements OnInit {
  //variable type Producto class
  productos: Producto[] = []

  constructor(private ps: ProductoService,private msg: MessageProductoService) { }

  ngOnInit() {
    this.getAllProductos()
    //This method will refresh the page
    this.msg.getMessage().subscribe((data) => {
      this.getAllProductos()
    })
  }

  //Function to obtain the data of the service
  getAllProductos(){
    //We use the subscribe to obtain all the data
    this.ps.getProductos().subscribe((all) => {
      this.productos = all
      console.log(this.productos)
    })
  }

}
