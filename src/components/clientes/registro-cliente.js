// Importación de la conexion
//const { connectDB, mongoose } = require('../config/config-mongo');

// Importación del modelo cliente
//const Cliente = require('../mongoDB/insertar/cliente');

// Metodo para Ingresar el cliente
/*const ClientAdd = async (
    Id_Cliente,
    nombre,
    apellido,
    cedula,
    RIF,
    edad,
    direccion,
    mail,
    whastApp,
    usuario,
    contraseña,
) => {
    try {

        // Abrir la conexion a la BD
        await connectDB();

        // Crear la instancia del nuevo cliente
        await Cliente.createInstance (
            Id_Cliente,
            nombre,
            apellido,
            cedula,
            RIF,
            edad,
            direccion,
            mail,
            whastApp,
            usuario,
            contraseña
        ); 
    } catch (err) {

        console.error('error en insertar un cliente: ', err);
    } finally {

        mongoose.connection.close();
    };
};*/

/*module.exports = {
    ClientAdd,
};*/