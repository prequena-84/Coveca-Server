require('dotenv').config({ path: '../../.env' }); // Ajusta la ruta según la ubicación de tu .env
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI_MONGO);
const db = mongoose.connection;
const { Schema, model } = mongoose;

//Asociar un error a la conexion
db.on('error', () => {});

// Sintasix que crea la clase Schema ya que en mongoose todo modelo deriba de una clase schema
const productSchema = new Schema({
    Id_Producto:{ type: String, unique: true, required: true }, // Campo único
    Articulo:String,
    unidadMedida:String,
    precio:Number,
    moneda:{ type: String, default: 'Bs' },
});

// Metodo para actualizar los datos,
productSchema.statics.actualizarProducto = async function(id, dataUpdate) {
    try {
        const newDataProduct = await this.findOneAndUpdate(
            {Id_Producto: id},
            dataUpdate,
            { new:true }
        );

        return newDataProduct;
    } catch(err) {
    };
};

// Mostrar todos los clientes sin filtros
productSchema.statics.allProduct = async function() {
    return await this.find();
};

// Ejemplo de filtro de Clientes por Numero
productSchema.statics.findProductName = async function(nombre) {
    return await this.find({
        nombre:new RegExp(`^${ nombre.replace(/[-\/\\^$.*+?()[\]{}|]/g, '\\$&') }`),
    });
};

productSchema.statics.findProductCode = function(id) {
    return this.findOne({
        Id_Producto:id,
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
    };
};

// Sintaxis que genera un modelo Asociado a ese esquema
const Producto = model('Producto', productSchema);

// Funcion para inicializar la base de datos
db.once('open', async () => {
    await addProduct('001-000001', 'Blister Comino', 'Gramo', 38.75);
    await addProduct('002-000001', 'Blister Pimienta', 'Onza', 2.5, 'USD');

    // Metodo correcto para cerrar la conexion de la base de datos
    mongoose.connection.close();
});

async function addProduct(Id_Producto,Articulo,unidadMedida,precio,moneda) {
    try {
        await Producto.createInstance(
            Id_Producto,
            Articulo,
            unidadMedida,
            precio,
            moneda,
        );
    } catch(err) {
    };
};

module.exports = Producto;