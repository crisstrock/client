export class Producto {
    id: string
    nombre: string
    descripcion: string
    categoria_id: string
    user_id: string

    constructor(nombre,descripcion,categoria_id,user_id){
        this.id = null
        this.nombre = nombre
        this.descripcion = descripcion
        this.categoria_id = categoria_id
        this.user_id = user_id
    }
}