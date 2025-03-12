require('dotenv').config({ path: '../../.env' }); // Ajusta la ruta según la ubicación de tu .env

// Importación de encriptador de contraseñas de usuarios
const bcrypt = require('bcrypt');

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI_MONGO);
const db = mongoose.connection;
const { Schema, model } = mongoose;

//Asociar un error a la conexion
db.on('error', () => {} );

// Sintasix que crea la clase Schema ya que en mongoose todo modelo deriba de una clase schema
const clientSchema = new Schema({
    Id_Cliente:{ type: String, unique: true, required: true }, // Campo único
    nombre:String,
    apellido:String,
    cedula: Number,
    RIF:String,
    edad:Number,
    direccion:String,
    mail:String,
    whastApp:String,
    usuario:{ type: String, required: true, unique: true },
    contraseña: { type: String, required: true },
});

// Metodo para guardar la Encriptación de la clave
clientSchema.pre('save', async (next) => {
    if ( !this.idModified('contraseña') ) return next;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash( this.password, salt);
    next();
});

// Metodo para actualizar los datos del cliente
clientSchema.statics.updateDataClient = async function(userName, dataUpdate) {
    try {
        const newDataClient = await this.findOneAndUpdate(
            {usuario: userName},
            dataUpdate,
            { new:true }
        );

        return newDataClient;
    } catch(err) {
    };
};

// Mostrar todos los clientes sin filtros
clientSchema.statics.allClient = async function() {
    return await this.find();
};

// Ejemplo de filtro de Clientes por Numero
clientSchema.statics.findClientName = async function(nombre) {
    return await this.find({
        nombre:new RegExp(`^${ nombre.replace(/[-\/\\^$.*+?()[\]{}|]/g, '\\$&') }`)
    });
};

// Ejemplo de filtro de clientes por numero de ID
clientSchema.statics.findClientCode = async function(id) {
    return await this.find({
        Id_Cliente:new RegExp(`^${ id.replace(/[-\/\\^$.*+?()[\]{}|]/g, '\\$&') }`)
    });
};

clientSchema.statics.createInstance = async function(Id_Cliente, nombre, apellido, cedula, RIF, edad, direccion, mail, whastApp,usuario,contraseña) {
    const newClient = new this({
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
    });

    return await newClient.save();
};

// Sintaxis que genera un modelo Asociado a ese esquema
const Cliente = model('Cliente', clientSchema);

// Abrir la conexión dentro de la conexion se deben aplicar los distintos comandos que le vamos aplicar a la tabla.
/*db.once('open', async () => {

    // Pendiente Crear Función para el registro de clientes
    await Cliente.createInstance(
        '1',         //Id_Cliente
        'Tito',      //nombre
        'Guerra',    // apellido
        16859785,    //cedula
        'V16859785', //RIF
        41,          // edad
        'La Guaira', // direccion
        'titoguerra@gmail.com', // mail
        '+54-424-123-45-657',   // whastApp
        'TTGuerra',             // UserName
        '1234',                 // PassWord
    );
    // Metodo correcto para cerrar la conexion de la base de datos
    mongoose.connection.close();
});*/

module.exports = Cliente;