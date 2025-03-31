// Importación de la conexion
const { connectDB, mongoose } = require('../../../config/config-mongo');

// Importación del modelo cliente
const Cliente = require('../../../mongoDB/model/cliente');

// Metodo para Ingresar el cliente
const ClientAdd = async (dataClient) => {
    try {
        // Abrir la conexion a la BD
        await connectDB();
        // Crear la instancia del nuevo cliente
        return await Cliente.createInstance(dataClient); 
    } catch (err) {
        return `Hubo un Error en el registro del cliente: ${err}`;
    } finally {
        mongoose.connection.close();
    };
};

module.exports = ClientAdd;