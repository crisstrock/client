import { Injectable } from '@angular/core';
//Import the Producto model
import { Producto } from './Producto';
//Import the HttpClient to do request with differents methods
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  //Url of the server
  server: string = 'http://localhost:8000/'
  //headers: HttpHeaders = new HttpHeaders()
  options: any

  constructor(private http: HttpClient) { }

  //function to add new productos
  addProducto(nombre,descripcion,categoria_id,user_id): Observable<Producto>{
    const newProducto = new Producto(nombre,descripcion,categoria_id,user_id)
    //To send parameters
    return this.http.post<Producto>(this.server+'api/add_producto', newProducto/*, {
      headers: new HttpHeaders(
          {
            'enctype': 'multipart/form-data',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          })   
  }*/)
  }

  //function to get all productos
  getProductos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.server+'api/get_productos')
  }

  //function to get one detail task
  getPresentaciones(no): Observable<Producto>{
    const presentaciones = {
      id: no,
      title: 'not set',
      status: false,
      date: new Date()
    }
    return this.http.post<Producto>(this.server+'api/get_presentacion', presentaciones)
  }

  //function to get all categorias
  //getCategorias(): Observable<

  //function to delete a productos
  deleteProducto(no): Observable<Producto>{
    const newProducto = {
      id: no,
      title: 'not set',
      descripcion: 'not set',
      categoria_id: null,
      user_id: null
    }
    return this.http.post<Producto>(this.server+'api/delete_producto', newProducto)
  }

  updateProducto(id_p, nombre_p, descripcion_p){
    const newProducto = {
      id: id_p,
      nombre: nombre_p,
      descripcion: descripcion_p,
    }
    return this.http.post<Producto>(this.server+'api/update_producto', newProducto)
  }

  //Function to change the current categoria 
  changeCategoriaProducto(p_id,cat_id): Observable<Producto>{
    const newProducto = {
      id: p_id,
      categoria_id: cat_id
    }
    return this.http.post<Producto>(this.server+'api/change_cat', newProducto)
  }

  //function to get one detail producto
  getOneProducto(no): Observable<Producto>{
    const newProducto = {
      id: no,
      title: 'not set',
      descripcion: 'not set',
      categoria_id: null,
      user_id: null
    }
    return this.http.post<Producto>(this.server+'api/getonetask', newProducto)
  }

}
