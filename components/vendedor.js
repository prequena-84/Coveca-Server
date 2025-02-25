const mongoose = require('mongoose');
const uri = 'mongodb+srv://prequena:52ohHwBT7MaMy9p9@db-operaciones.ktjoy.mongodb.net/?retryWrites=true&w=majority&appName=DB-Operaciones';

mongoose.connect(uri);

const db = mongoose.connection;

//Asociar un error a la conexion
db.on('error', console.error.bind(console, '  error:'));

// Sintasix que crea la clase Schema ya que en mongoose todo modelo deriba de una clase schema
const sellerSchema = new mongoose.Schema({
    Id_Vendedor:{ type: String, unique: true, required: true }, // Campo único
    nombre:String,
    apellido:String,
    cedula: Number,
    RIF:String,
    mail:String,
    whastApp:String,
});

// Mostrar todos los clientes sin filtros
sellerSchema.statics.allSeller = async function() {
    return await this.find();
};

// Ejemplo de filtro de Clientes por Numero
sellerSchema.statics.findSellerName = async function(nombre) {
    return await this.find({
        nombre:new RegExp(`^${ nombre.replace(/[-\/\\^$.*+?()[\]{}|]/g, '\\$&') }`)
    });
};

// Ejemplo de filtro de Vendedor por numero de ID
sellerSchema.statics.findSellerCode = async function(id) {
    return await this.find({
        Id_Vendedor:new RegExp(`^${ id.replace(/[-\/\\^$.*+?()[\]{}|]/g, '\\$&') }`)
    });
};

sellerSchema.statics.createInstance = function(Id_Vendedor, nombre, apellido, cedula, RIF, mail, whastApp) {
    const newSeller = new this({
        Id_Vendedor, 
        nombre,
        apellido,
        cedula,
        RIF,
        mail,
        whastApp,
    });

    return newSeller.save();
};

// Sintaxis que genera un modelo Asociado a ese esquema
const Vendedor = mongoose.model('Vendedor', sellerSchema);

// abir la conexion. dentro de la conexion se deben aplicar los distintos comandos que le vamos aplicar a la tabla.
db.once('open', async () => {
    console.log('--------------Inicio de regsitro de Vendedor----------------');
    try {
        await Vendedor.createInstance(
            'YK-01',                           // Id_Vendedor 
            'Karina',                          // nombre
            'Guerra',                        // apellido
            17387775,                         // cedula
            'V17387756',                     // RIF
            'yormaty@gmail.com', // mail
            '+54-424-123-45-67',              // whastApp
        );

        console.log('--------------ok registro de Vendedor------------------------');
    } catch(err) {
        console.log('error:', err);
    };

    console.log('--------------Inicio de regsitro de Vendedor----------------');
    try {
        await Vendedor.createInstance(
            'YG-01',                           // Id_Vendedor 
            'Karina',                          // nombre
            'Guerra',                        // apellido
            17387775,                         // cedula
            'V17387756',                     // RIF
            'yormaty@gmail.com', // mail
            '+54-424-123-45-67',              // whastApp
        );

        console.log('--------------ok registro de Vendedor------------------------');
    } catch(err) {
        console.log('error:', err);
    };

    console.log('--------------Inicio de regsitro de Vendedor 2----------------');
    try {
        await Vendedor.createInstance(
            'PR-01',                           // Id_Vendedor 
            'Pedro',                          // nombre
            'REquena',                        // apellido
            17477617,                         // cedula
            'V174776176',                     // RIF
            'pedrorequenarondon@hotmail.com', // mail
            '+54-424-177-20-59',              // whastApp
        );

        console.log('--------------ok registro de Vendedor 2------------------------');
    } catch(err) {
        console.log('error:', err);
    };

    console.log('--------------Inicio de regsitro de Vendedor 3----------------');
    try {
        await Vendedor.createInstance(
            'YZ-01',                           // Id_Vendedor 
            'Yubi',                          // nombre
            'Guerra',                        // apellido
            19658712,                         // cedula
            'V196587120',                     // RIF
            'yurbelisguerra@hotmail.com', // mail
            '+54-424-188-60-33',              // whastApp
        );

        console.log('--------------ok registro de Vendedor 3------------------------');
    } catch(err) {
        console.log('error:', err);
    };

    // Metodo correcto para cerrar la conexion de la base de datos
    mongoose.connection.close();
});