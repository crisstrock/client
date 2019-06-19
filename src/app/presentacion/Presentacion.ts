export class Presentacion {
    id: string
    nombre: string
    cantidad: string
    unidad_medida: string
    precio: string
    producto_id: string

    constructor(nombre,cantidad,unidad_medida,precio,producto_id){
        this.id = null
        this.nombre = nombre
        this.cantidad = cantidad
        this.unidad_medida = unidad_medida
        this.precio = precio
        this.producto_id = producto_id
    }
}