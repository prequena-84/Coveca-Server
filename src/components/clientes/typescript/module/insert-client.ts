import type Iclient from '../../interface/interface'
const { connectDB, mongoose } = require('../../../../src/components/config/config-mongo.js')
const Client = require('../../../../src/components/mongoDB/insertar/cliente.js')

async function ClientAdd( dataClient:Iclient ) {
    try {
        // Abrir la conexion a la BD
        await connectDB()
        // Crear la instancia del nuevo cliente
        await Client.createInstance(dataClient)
    } catch(err) {
        // Controlador de Errores
        console.error('error en insertar un cliente: ', err)
    } finally {
        // Cierre de la Conexión de Mongo
        mongoose.connection.close()
    }
}

export = {
    ClientAdd,
}