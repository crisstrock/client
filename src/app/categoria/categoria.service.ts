import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Categoria } from './categoria';
import { HttpErrorHandlerService, HandlerError } from '../http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private handleError: HandlerError

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandlerService) {
    this.handleError = httpErrorHandler.createHandlerError('CategoriaService')
   }

   getCategorias(): Observable<Categoria[]>{
    return this.http
      .get<Categoria[]>('api/categorias')
      .pipe(catchError(this.handleError('getCategorias', [])))
   }

   addCategoria(categoria: Categoria): Observable<Categoria>{
    return this.http
      .post<Categoria>('api/categoria', categoria)
      .pipe(catchError(this.handleError('addCategoria', categoria)))
   }

   deleteCategoria(id: number): Observable<{}>{
     const url = `api/categoria/${id}`
    return this.http
      .delete(url)
      .pipe(catchError(this.handleError('deleteCategoria')))
   }

  updateCategoria(categoria: Categoria): Observable<Categoria>{
   return this.http
     .put<Categoria>(`api/categoria/${categoria.id}`, categoria)
     .pipe(catchError(this.handleError('updateCategoria', categoria)))
  }

}
