require('dotenv').config({ path: '../../.env' }); // Ajusta la ruta según la ubicación de tu .env
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI_MONGO);
const db = mongoose.connection;
const { Schema } = mongoose;

//Asociar un error a la conexion
db.on('error', console.error.bind(console, '  error:'));

// Sintasix que crea la clase Schema ya que en mongoose todo modelo deriba de una clase schema
const productSchema = new Schema({
    Id_Producto:{ type: String, unique: true, required: true }, // Campo único
    Articulo:String,
    unidadMedida:String,
    precio:Number,
    moneda:{ type: String, default: 'Bs' },
});

/*
    Quede en hacer un metodo para actualizar del producto asi para cambiar el precio, nombre, cantidad, moneda, etc, etc.
    luego de esto crear un metodo para modificar el inventario por si hay un error en el registro del inventario y evitar de volver a
    cargar los datos.
 */

// Metodo para actualizar los datos,
productSchema.statics.actualizarProducto = async function(id,dataUpdate) {
    try {
        const newDataProduct = await this.findOneUpdate(
            {Id_Producto: id},
            dataUpdate,
            { new:true }
        );

        return newDataProduct;
    } catch(err) {
        console.log('error:', err);
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
        //console.log('error:', err);
    };
};

productSchema.statics.add = async function(producto) {
   await this.create(producto);
};

// Sintaxis que genera un modelo Asociado a ese esquema
const Producto = mongoose.model('Producto', productSchema);

// abir la conexion. dentro de la conexion se deben aplicar los distintos comandos que le vamos aplicar a la tabla.
db.once('open', async () => {


    // Objecto que contiene los datos del producto para pasar los datos por el metodo create
    const producto_1 = {
        Id_Producto:'001-000001',     // Codigo 
        Articulo:'Blister Comino', // Nombre Articulo,
        unidadMedida:'Gramo',           // Unidad de Medida,
        precio:38.75,              // Precio,
        //'Bs',            // moneda
    };

    // Metodo create funcionando correctamente.
    await Producto.add(producto_1);

    /*try {
        await Producto.createInstance(
            '002-000001',     // Codigo 
            'Blister Canela', // Nombre Articulo,
            'Onza',           // Unidad de Medida,
            2.5,              // Precio,
            'USD',            // moneda
        );
    } catch(err) {
        //console.log('error:', err);
    };*/
    
    // Metodo correcto para cerrar la conexion de la base de datos
    mongoose.connection.close();
});

module.exports = Producto;