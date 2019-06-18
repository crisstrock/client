import { Component, OnInit } from '@angular/core';

import { ViewChild, ElementRef } from '@angular/core';
//Import model
import { Categoria } from './categoria';
//import the service
import { CategoriaService } from './categoria.service';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
  providers: [CategoriaService]
})
export class CategoriaComponent implements OnInit {
  categorias: Categoria[]
  editCategoria: Categoria

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
  	this.getCategorias();
  }

  getCategorias(): void {
    this.categoriaService.getCategorias().subscribe(categorias => (this.categorias = categorias))
  }

  add(nombre: string, descripcion: string){    
    this.editCategoria = undefined
    nombre = nombre.trim()
    descripcion = descripcion.trim()
    if(!nombre && !descripcion){
      return
    }

    const newCategoria: Categoria = {nombre,descripcion} as Categoria
    this.categoriaService.addCategoria(newCategoria).subscribe(categoria => this.categorias.push(categoria))
  }

  delete(categoria: Categoria): void{
    this.categorias = this.categorias.filter(h => h !== categoria)
    this.categoriaService.deleteCategoria(categoria.id).subscribe()
  }

  edit(categoria){
    this.editCategoria = categoria
  }

  update(){
    if(this.editCategoria){
      this.categoriaService.updateCategoria(this.editCategoria).subscribe(categoria => {
        const ix = categoria ? this.categorias.findIndex(h => h.id === categoria.id) : -1
        if(ix > -1){
          this.categorias[ix] = categoria
        }
      })
      this.editCategoria = undefined
    }
  }

}
