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

/*
    Quede en hacer un metodo para actualizar del producto asi para cambiar el precio, nombre, cantidad, moneda, etc, etc.
    luego de esto crear un metodo para modificar el inventario por si hay un error en el registro del inventario y evitar de volver a
    cargar los datos.
 */

/**
 * Ejemplo:
 * 
 * ventaSchema.statics.actualizarVenta = async function(id, datosActualizados) {
    try {
        const resultado = await this.findByIdAndUpdate(id, datosActualizados, { new: true });
        return resultado; // Retorna el documento actualizado
    } catch (error) {
        throw new Error('Error al actualizar la venta: ' + error.message);
    }
   };

   // Ejemplo aplicado
   const Ventas = require('../mongoDB-query/venta'); // Asegúrate de que la ruta sea correcta

        async function actualizarDatosVenta(id, nuevosDatos) {
            try {
                const ventaActualizada = await Ventas.actualizarVenta(id, nuevosDatos);
                console.log('Venta actualizada:', ventaActualizada);
            } catch (error) {
                console.error(error);
            }
        }

    // Llama a la función con el ID de la venta y los nuevos datos
    actualizarDatosVenta('ID_DE_LA_VENTA', { IdCliente: 'nuevoIdCliente', IdVendedor: 'nuevoIdVendedor' }); 
 * 
 * este es el metodo "findByIdAndUpdate"
 */
// Metodo para actualizar los datos,
productSchema.statics.actualizarProdcuto = function() {
    try {


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
}

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
    //console.log('--------------Inicio de registro de Producto----------------');
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

        //console.log('--------------ok de registro de Producto------------------------');
    } catch(err) {
        //console.log('error:', err);
    };

    // Metodo correcto para cerrar la conexion de la base de datos
    mongoose.connection.close();
});

module.exports = Producto;