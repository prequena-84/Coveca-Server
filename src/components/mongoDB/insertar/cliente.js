const { Schema, model } = require('mongoose');

// Importación de encriptador de contraseñas de usuarios
const bcrypt = require('bcrypt');

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
clientSchema.pre('save', async function(next) {
    if (!this.isModified('contraseña')) return next();

    const salt = await bcrypt.genSalt(10);
    this.contraseña = await bcrypt.hash(this.contraseña, salt);

    console.log('contraseña: ', this.contraseña);
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
        console.error(err);
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
    try {

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

        console.log('seregistro el cliente sastifactoriamente')
        return await newClient.save();
    } catch(err) {

        console.log('error en registro de cliewnte: '. err);
    }
};

// Sintaxis que genera un modelo Asociado a ese esquema
const Cliente = model('Cliente', clientSchema);
module.exports = Cliente;