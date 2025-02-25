const mongoose = require('mongoose');
const uri = 'mongodb+srv://prequena:52ohHwBT7MaMy9p9@db-operaciones.ktjoy.mongodb.net/?retryWrites=true&w=majority&appName=DB-Operaciones';

mongoose.connect(uri);

const db = mongoose.connection;

//Asociar un error a la conexion
db.on('error', console.error.bind(console, '  error:'));

// Sintasix que crea la clase Schema ya que en mongoose todo modelo deriba de una clase schema
const clientSchema = new mongoose.Schema({
    Id_Cliente:{ type: String, unique: true, required: true }, // Campo único
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

// Sintaxis que genera un modelo Asociado a ese esquema
const Cliente = mongoose.model('Cliente', clientSchema);

// abir la conexion. dentro de la conexion se deben aplicar los distintos comandos que le vamos aplicar a la tabla.
db.once('open', async () => {
    console.log('--------------Inicio de regsitro de cliente 1----------------');
    try {
        await Cliente.createInstance(
            '1',                    // Id_Cliente 
            'Tito',                 // nombre
            'Guerra',               // apellido
            1585689,                // cedula
            'V1585689-0',           // RIF
            40,                     // edad
            'La Guaira, naiguata',  // direccion
            'titoguerra@gmail.com', // mail
            '+54-424-177-20-59',    // whastApp
        );

        console.log('--------------Registro de cliente 1------------------------');
    } catch(err) {
        console.log('error:', err);
    };

    // Metodo correcto para cerrar la conexion de la base de datos
    mongoose.connection.close();
});