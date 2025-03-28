"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { connectDB, mongoose } = require('../../../../src/components/config/config-mongo.js');
const Client = require('../../../../src/components/mongoDB/insertar/cliente.js');
function ClientAdd(clientData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Abrir la conexion a la BD
            yield connectDB();
            // Crear la instancia del nuevo cliente
            yield Client.createInstance(clientData);
        }
        catch (err) {
            // Controlador de Errores
            console.error('error en insertar un cliente: ', err);
        }
        finally {
            // Cierre de la Conexión de Mongo
            mongoose.connection.close();
        }
    });
}
module.exports = {
    ClientAdd,
};
