const mongoose = require('mongoose');
const uri = 'mongodb+srv://prequena:52ohHwBT7MaMy9p9@db-operaciones.ktjoy.mongodb.net/?retryWrites=true&w=majority&appName=DB-Operaciones';

mongoose.connect(uri);

const db = mongoose.connection;

//Asociar un error a la conexion
db.on('error', console.error.bind(console, '  error:'));

// Sintasix que crea la clase Schema ya que en mongoose todo modelo deriba de una clase schema
const productSchema = new mongoose.Schema({
    Id_Producto:{ type: String, unique: true, required: true }, // Campo único
    Articulo:String,
    unidadMedida:String,
    precio:Number,
    moneda:{ type: String, default: 'Bs' },
});

// Mostrar todos los clientes sin filtros
productSchema.statics.allProduct = async function() {
    return await this.find();
};

// Ejemplo de filtro de Clientes por Numero
productSchema.statics.findSProductName = async function(nombre) {
    return await this.find({
        nombre:new RegExp(`^${ nombre.replace(/[-\/\\^$.*+?()[\]{}|]/g, '\\$&') }`)
    });
};

// Ejemplo de filtro de Vendedor por numero de ID
productSchema.statics.findProductCode = async function(id) {
    return await this.find({
        Id_Producto:new RegExp(`^${ id.replace(/[-\/\\^$.*+?()[\]{}|]/g, '\\$&') }`)
    });
};

productSchema.statics.createInstance = async function(Id_Producto, Articulo, unidadMedida, precio, moneda) {
    try {
        const newProduct = new this({
            Id_Producto, 
            Articulo,
            unidadMedida,
            precio,
            moneda,
        });

        return await newProduct.save();
    } catch(err) {
        //console.log('error:', err);
    }
};

// Sintaxis que genera un modelo Asociado a ese esquema
const Producto = mongoose.model('Producto', productSchema);

// abir la conexion. dentro de la conexion se deben aplicar los distintos comandos que le vamos aplicar a la tabla.
db.once('open', async () => {
    console.log('--------------Inicio de registro de Producto----------------');
    try {
        await Producto.createInstance(
            '001-000001',     // Codigo 
            'Blister Comino', // Nombre Articulo,
            'gr',             // Unidad de Medida,
            35.63,                // Precio,
            //'Bs',              // moneda
        );

        await Producto.createInstance(
            '002-000001',     // Codigo 
            'Blister Canela', // Nombre Articulo,
            'Onza',             // Unidad de Medida,
            2.5,                // Precio,
            'USD',              // moneda
        );

        console.log('--------------ok de registro de Producto------------------------');
    } catch(err) {
        //console.log('error:', err);
    };

    // Metodo correcto para cerrar la conexion de la base de datos
    mongoose.connection.close();
});

module.exports = Producto;