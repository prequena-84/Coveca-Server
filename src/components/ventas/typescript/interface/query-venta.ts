// Importación de Tiposde mongoose
import type { Types } from 'mongoose'

// Tipo de cantidad de ventas
type saleQuantity = number | 0

// Interface de Productos
interface IProduct {
    _id:Types.ObjectId,
    Id_Lote:string,
    IdProducto:string,
    IdVendedor:String,
    fechaElaboracion:Date,
    fechaVencimiento:Date,
    stock:saleQuantity,
    precioUnidad:number,
    precioLote:number,
    moneda: 'Bs' | 'USD',
    __v:number,
}


export {
    saleQuantity,
    IProduct,
}