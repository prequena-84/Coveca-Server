// Importación de la conexion
const { connectDB, mongoose } = require('../config/config-mongo');

// Importación del modelo cliente
const Cliente = require('../mongoDB/insertar/cliente');

// Metodo para Ingresar el cliente
const ClientAdd = async (dataClient) => {
    try {

        // Abrir la conexion a la BD
        await connectDB();

        // Crear la instancia del nuevo cliente
        await Cliente.createInstance(dataClient); 
    } catch (err) {

        console.error('error en insertar un cliente: ', err);
    } finally {
        
        mongoose.connection.close();
    };
};

module.exports = ClientAdd;