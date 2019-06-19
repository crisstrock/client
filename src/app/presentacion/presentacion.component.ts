import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef  } from '@angular/core';
//To aactivate the route and get the parameter
import { ActivatedRoute } from '@angular/router';
//import the model
import { Producto } from '../producto/producto';
import { Presentacion } from './Presentacion';
//import the service producto
import { ProductoService } from '../producto/producto.service';
//import the service message
import { MessageProductoService } from '../producto/message-producto.service';
//Bootstrap modal
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//Datatables
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

//Alerts bootstrap
interface Alert {
  type: string;
  message: string;
}

@Component({
  selector: 'app-presentacion',
  templateUrl: './presentacion.component.html',
  styleUrls: ['./presentacion.component.css']
})
export class PresentacionComponent implements AfterViewInit, OnDestroy, OnInit {
  producto: Producto

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {}

  producto_id:string = ''
  producto_nombre: string = ''

  //variables to presentacion
  nombre: string
  cantidad:string
  unidad_medida: string
  precio: string

  //Edit modal
  @ViewChild('contentPr', {static: false}) contentPrEdit: ElementRef
  presentacion: Presentacion
  id_edit: string
  nombre_edit: string
  cantidad_edit:string
  unidad_medida_edit: string
  precio_edit: string

  alert: Alert = {
    type: '',
    message: '',
  }

  constructor(private route: ActivatedRoute, private ps: ProductoService,private msg: MessageProductoService, private modalService: NgbModal) { }

  dtTrigger = new Subject();

  ngOnInit() {
    this.getDataTable()
    this.getNombreProducto()
    //This method will refresh the page
    this.msg.getMessage().subscribe((data) => {
      this.getDataTable()
      this.getNombreProducto()
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
    })
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  getNombreProducto(){
    this.ps.getOneProducto(this.producto_id).subscribe((data) => {
      this.producto_nombre = data.nombre
    })
  }

  getDataTable(){
    this.route.params.subscribe((data) => {
      this.producto_id = data.id
      this.dtOptions = {
        ajax: 'api/presentacion/'+this.producto_id,
        columns: [{
          title: 'Nombre',
          data: 'nombre'
        }, {
          title: "Cantidad",
          data: "cantidad"
        }, {
          title: "Unidad de Medida",
          data: "unidad_medida"
        }, {
          title: "Precio",
          data: "precio"
        }, {
          title: "Opciones",
          defaultContent: `<button id="edit_p" type="button" class="btn btn-xs btn-primary"><i class="fas fa-eye"></i></button>
          <button id="delete_p" type="button" class="btn btn-xs btn-danger"><i class="fas fa-trash-alt"></i></button>`
        }],
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          // Unbind first in order to avoid any duplicate handler
          // (see https://github.com/l-lin/angular-datatables/issues/87)
          //$('td', row).unbind('click');
          $('#edit_p',row).bind('click', () => {
            self.openEditPresentacion(this.contentPrEdit, data)
          })
          $('#delete_p',row).bind('click', () => {
            self.deletePresentacion(data)
          })
          return row;
        }
      };
    })
  }

  addPresentacion(){
    this.ps.addPresentacionProducto(this.nombre,this.cantidad,this.unidad_medida,this.precio,this.producto_id).subscribe((data) => {
      this.alert = {
        type: 'success',
        message: 'Presentación agregada correctamente',
      }
      this.msg.setMessage("Presentacion added")
      this.modalService.dismissAll()
    })
  }

  deletePresentacion(info: any){
    this.ps.deletePresentacionProducto(info.id).subscribe((data) => {
      this.alert = {
        type: 'success',
        message: 'Presentación eliminada correctamente',
      }
      this.msg.setMessage("Presentacion deleted")
    })
  }

  editPresentacion(e,nombre,cantidad,unidad,precio,prod_id): void{
    e.preventDefault()
    this.ps.editPresentacionProducto(this.presentacion.id,nombre.value,cantidad.value,unidad.value,precio.value,prod_id.value).subscribe((data) => {
      this.alert = {
        type: 'success',
        message: 'Presentación actulizada correctamente',
      }
      this.msg.setMessage("Presentacion edited")
      this.modalService.dismissAll()
    })
  }

  //To open modal
  open(content){
    this.modalService.open(content, { centered: true });
  }
  openEditPresentacion(modal,info:any){
    const presentacion = {
      id: info.id,
      nombre: info.nombre,
      cantidad: info.cantidad,
      unidad_medida: info.unidad_medida,
      precio: info.precio,
      producto_id: info.producto_id
    }
    this.presentacion = presentacion
    
    console.log(info.id+' '+info.nombre+' '+info.cantidad+' '+info.unidad_medida+' '+info.precio+' '+info.producto_id)
    console.log(this.presentacion.id+' '+this.presentacion.nombre)
    this.modalService.open(modal);
  }

  //Alerts
  close(alert: Alert) {
    alert.type = ''
    alert.message = ''
    this.alert = {
      type: '',
      message: ''
    }
    //this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

}
