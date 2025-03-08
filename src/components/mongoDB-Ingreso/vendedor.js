require('dotenv').config({ path: '../../.env' }); // Ajusta la ruta según la ubicación de tu .env
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI_MONGO);
const db = mongoose.connection;
const { Schema, model } = mongoose;

//Asociar un error a la conexion
db.on('error', console.error.bind(console, '  error:'));

// Sintasix que crea la clase Schema ya que en mongoose todo modelo deriba de una clase schema
const sellerSchema = new Schema({
    Id_Vendedor:{ type: String, unique: true, required: true }, // Campo único
    nombre:String,
    apellido:String,
    cedula: Number,
    RIF:String,
    mail:String,
    whastApp:String,
});

// Mostrar todos los clientes sin filtros
sellerSchema.statics.allSeller = function() {
    return this.find();
};

// Ejemplo de filtro de Clientes por Numero
sellerSchema.statics.findSellerName = function(nombre) {
    return this.find({
        nombre:new RegExp(`^${ nombre.replace(/[-\/\\^$.*+?()[\]{}|]/g, '\\$&') }`)
    });
};

// Ejemplo de filtro de Vendedor por numero de ID
sellerSchema.statics.findSellerCode = function(id) {
    return this.find({
        Id_Vendedor:new RegExp(`^${ id.replace(/[-\/\\^$.*+?()[\]{}|]/g, '\\$&') }`)
    });
};

sellerSchema.statics.createInstance = function(Id_Vendedor, nombre, apellido, cedula, RIF, mail, whastApp) {
    try {
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
    } catch(err){
        console.log(err);
    };
};

// Sintaxis que genera un modelo Asociado a ese esquema
const Vendedor = model('Vendedor', sellerSchema);

// abir la conexion. dentro de la conexion se deben aplicar los distintos comandos que le vamos aplicar a la tabla.
db.once('open', async () => {

    await addVendedor('YK-01', 'Karina', 'Guerra', 17387775, 'V17387756', 'yormaty@gmail.com','+54-424-123-45-67');
    await addVendedor('YG-01', 'Yuberlis', 'Guerra', 19658712, 'V196587126', 'yubi@gmail.com','+54-424-123-45-67');
    await addVendedor('PR-01', 'Pedro', 'Guerra', 17477617, 'V17477617', 'pedro@gmail.com','+54-424-177-20-59');

    // Metodo correcto para cerrar la conexion de la base de datos
    mongoose.connection.close();

    async function addVendedor(Id_Vendedor, nombre, apellido, cedula, RIF, mail, whastApp) {
        console.log(`--------------Inicio de regsitro de Vendedor ${ Id_Vendedor } ${ nombre +' '+apellido }  ----------------`);
        await Vendedor.createInstance(
            Id_Vendedor,
            nombre,
            apellido,
            cedula,
            RIF,
            mail,
            whastApp,
        );
    };
});