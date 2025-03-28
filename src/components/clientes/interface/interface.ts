// Importación de Tiposde mongoose
import type { Types } from 'mongoose'

export default interface Iclient {
    _id:Types.ObjectId;
    nombre:string;
    apellido:String;
    cedula:number;
    RIF:string;
    edad:number;
    direccion:string;
    mail:string;
    whastApp:string;
    usuario:string;
    contraseña:string;
    __v:number,
}