import { Component, OnInit } from '@angular/core';
//import the service producto
import { ProductoService } from './producto.service';
//import the service message
import { MessageProductoService } from './message-producto.service';
//Import model
import { Categoria } from '../categoria/categoria';
//import the service categoria
import { CategoriaService } from '../categoria/categoria.service';
//import services of the user
import { AuthenticationService, UserDetails } from '../authentication.service'
//Bootstrap modal
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { concat } from 'rxjs';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  //Variable declared in ngModel
  name: string = ''
  description: string = ''
  categoria_id: string = '0'
  cat_id: string = ''
  user_id: string
  u_id: string = ''
  //To know if the input is empty
  formSubmitted: boolean = false
  //Interface of categoria
  categorias: Categoria[]
  //User details to obtain the user id
  //details: UserDetails

  constructor(private ps: ProductoService, private msg: MessageProductoService, private categoriaS: CategoriaService,private modalService: NgbModal, private auth: AuthenticationService) { }

  ngOnInit() {
    this.getCategorias()

    this.auth.profile().subscribe(
      (oneuser) => {
        this.user_id = oneuser.user.id
      },
      (err) => {
        console.error(err)
      }
    )
  }

  //Function to get all categorias and show the select with that information
  getCategorias(): void {
    this.categoriaS.getCategorias().subscribe(categorias => (this.categorias = categorias))
  }

  //Function to add new producto
  add(e){
    this.formSubmitted = true
    e.preventDefault()
    this.cat_id = this.categoria_id
    this.u_id = this.user_id
    
    this.ps.addProducto(this.name,this.description, this.cat_id, this.u_id).subscribe((data) => {
      console.log('producto added ')
      this.name = ''
      this.description = ''
      this.formSubmitted = false
      this.msg.setMessage("Something happen")
      this.modalService.dismissAll()
    })
  }

  //function to open modal
  open(content){
    this.modalService.open(content, { centered: true });
  }

}
