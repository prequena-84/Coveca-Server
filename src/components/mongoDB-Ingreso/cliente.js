require('dotenv').config({ path: '../../.env' }); // Ajusta la ruta según la ubicación de tu .env
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI_MONGO);
const db = mongoose.connection;
const { Schema } = mongoose;

//Asociar un error a la conexion
db.on('error', console.error.bind(console, '  error:'));

// Sintasix que crea la clase Schema ya que en mongoose todo modelo deriba de una clase schema
const clientSchema = new Schema({
    Id_Cliente:{ type: Number, unique: true, required: true }, // Campo único
    nombre:String,
    apellido:String,
    cedula: Number,
    RIF:String,
    edad:Number,
    direccion:String,
    mail:String,
    whastApp:String,
});

// Para agregar un metodo al esquema
clientSchema.methods.saludar = function() {
    const saludo =this.nombre ? "mi nombre es " + this.nombre : "hola no tengo nombre";
    console.log(saludo);
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

clientSchema.statics.createInstance = async function(Id_Cliente, nombre, apellido, cedula, RIF, edad, direccion, mail, whastApp) {
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
    });

    return await newClient.save();
};

clientSchema.statics.add = async function(dataClient) {
    await this.create(dataClient);
};

// Sintaxis que genera un modelo Asociado a ese esquema
const Cliente = mongoose.model('Cliente', clientSchema);

// abir la conexion. dentro de la conexion se deben aplicar los distintos comandos que le vamos aplicar a la tabla.
db.once('open', async () => {
    console.log('--------------Inicio de regsitro de cliente ----------------');

    const cliente = {
        Id_Cliente:1,
        nombre:'Tito',
        apellido:'Guerra',
        cedula: '16859785',
        RIF:'V16859785',
        edad:41,
        direccion:'La Guaira',
        mail:'titoguerra@gmail.com',
        whastApp:'+54-424-123-45-657',
    }

    try {
        await Cliente.add(cliente);

        console.log('--------------Registro de cliente ------------------------');
    } catch(err) {
        console.log('error:', err);
    };

    // Metodo correcto para cerrar la conexion de la base de datos
    mongoose.connection.close();
});