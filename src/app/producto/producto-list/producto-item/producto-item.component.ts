//import Input to obtain the parameter
import { Component, OnInit, Input } from '@angular/core';
//import model Producto
import { Producto } from '../../Producto';
//import Producto service and MessageProductoService
import { ProductoService } from '../../producto.service';
import { MessageProductoService } from '../../message-producto.service';
//Import CategoriaService and model
import { CategoriaService } from '../../../categoria/categoria.service';
import { Categoria } from '../../../categoria/categoria';
//Bootstrap modal
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-producto-item',
  templateUrl: './producto-item.component.html',
  styleUrls: ['./producto-item.component.css']
})
export class ProductoItemComponent implements OnInit {
  nombre: string = ''

  categoriaId:string = '0'
  new_categoria_id: string = ''

  categoria: Categoria
  categorias: Categoria[]
  
  @Input() producto: Producto

  constructor(private ps: ProductoService,private msg: MessageProductoService,private cs: CategoriaService ,private modalService: NgbModal) { }

  ngOnInit() {
    this.getCategoriaById()
    this.getCategorias()
  }

  //Function to obtain what is the categoria for the producto
  getCategoriaById(){
    this.cs.getCategoriaById(this.producto.categoria_id).subscribe((data) => {
      this.categoria = data
    })
  }
  getCategorias(): void {
    this.cs.getCategorias().subscribe((categorias) => {
      this.categorias = categorias
    })
  }

  //Function to delete productos
  delete(){
    this.ps.deleteProducto(this.producto.id).subscribe((data) => {
      this.msg.setMessage("Producto deleted")
    })
  }

  //update producto
  update(nombre,descripcion){
    this.ps.updateProducto(this.producto.id,nombre.value,descripcion.value).subscribe((data) => {
      this.msg.setMessage("Producto updated")
      this.modalService.dismissAll()
    })
  }

  //Function to change categoria of the producto
  changeCategoria(e){
    e.preventDefault()
    //Asignamos el nuevo valor a la variable
    this.new_categoria_id = this.categoriaId
    this.ps.changeCategoriaProducto(this.producto.id, this.new_categoria_id).subscribe((data) => {
      this.msg.setMessage("Categoria changed")
      this.modalService.dismissAll()
    })
  }

  //To open edit modal
  open(content){
    this.modalService.open(content, { centered: true });
  }
  openModalChange(content){
    this.modalService.open(content, { centered: true });
  }

}
