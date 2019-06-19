import { Injectable } from '@angular/core';
//Import the Producto model and Presentacion Model
import { Producto } from './Producto';
import { Presentacion } from '../presentacion/Presentacion';
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
    return this.http.post<Producto>(this.server+'api/getone_producto', newProducto)
  }

  //--------Section from Presentacion of Productos ----------------------------

  //This function will add a new presentacion of some producto
  addPresentacionProducto(nombre,cantidad,unidad_medida,precio,producto_id): Observable<Presentacion>{
    const newPresentacion = {
      nombre: nombre,
      cantidad: cantidad,
      unidad_medida: unidad_medida,
      precio: precio,
      producto_id: producto_id
    }
    return this.http.post<Presentacion>(this.server+'api/add_presentacion', newPresentacion)
  }

  editPresentacionProducto(id,nombre,cantidad,unidad,precio,p_id): Observable<Presentacion>{
    const newPresentacion = {
      id:id,
      nombre: nombre,
      cantidad: cantidad,
      unidad_medida: unidad,
      precio: precio,
      producto_id: p_id
    }
    return this.http.post<any>(this.server+'api/edit_presentacion', newPresentacion)
  }

  deletePresentacionProducto(id): Observable<Presentacion>{
    const newPresentacion = {
      id:id,
      nombre: '',
      cantidad: '',
      unidad_medida: '',
      precio: '',
      producto_id: ''
    }
    return this.http.post<Presentacion>(this.server+'api/delete_presentacion', newPresentacion)
  }

}
