const Productos = require('./producto');
const mongoose = require('mongoose');
const uri = 'mongodb+srv://prequena:52ohHwBT7MaMy9p9@db-operaciones.ktjoy.mongodb.net/?retryWrites=true&w=majority&appName=DB-Operaciones';

mongoose.connect(uri);

const db = mongoose.connection;

// Asociar un error a la conexion
db.on('error', () => {} ); //console.error.bind(console, '  error:'));

// Esquema Ventas
const inventorySchema = new mongoose.Schema({
    Id_Lote:{ type: String, unique: true, required: true }, // Campo único
    IdProducto:String,
    IdVendedor: String,
    fechaElaboracion:Date,
    fechaVencimiento:Date,
    stock:Number,
    precioUnidad:Number,
    precioLote:Number,
    moneda:String,
});

// Calculo Total
inventorySchema.methods.CalculoTotal=  function() {
    return this.stock * this.precioUnidad;
};

// Total facturas
inventorySchema.statics.allInventory = function() {
    return this.find();
};

inventorySchema.statics.quantityProduct = function(id) {
    return this.find({
        IdProducto:id,
    });
};

// Filtro de Facturas por numero de vendedor
inventorySchema.statics.findInventoryIdProduct = async function(id) {
    return await this.find({
        IdProducto:new RegExp(`^${ id.replace(/[-\/\\^$.*+?()[\]{}|]/g, '\\$&') }`)
    });
};

inventorySchema.statics.findInventoryDate = async function(fechaVencimiento) {
    return await this.find({
        fechaVencimiento:new RegExp(`^${ fechaVencimiento.replace(/[-\/\\^$.*+?()[\]{}|]/g, '\\$&') }`)
    });
};

// Instancia para el registro de nuevas facturas
inventorySchema.statics.createInstance = async function(
    Id_Lote,           // Campo único
    IdProducto,
    IdVendedor,
    fechaElaboracion,
    fechaVencimiento,
    stock,
) {
    try{
        const 
            newInventory = new this({
                Id_Lote,           
                IdProducto,
                IdVendedor,
                fechaElaboracion,
                fechaVencimiento,
                stock,
            },)
            itemProduct = await Productos.findOne({ Id_Producto:IdProducto })
        ;

        newInventory.precioUnidad = itemProduct.precio;
        newInventory.precioLote = newInventory.CalculoTotal();
        newInventory.moneda = itemProduct.moneda;
    
        return await newInventory.save();
    } catch(err) {
    }
};

// Asociacion del modelo de ventas
const Inventario = mongoose.model ('Inventario', inventorySchema);

// abir la conexion. dentro de la conexion se deben aplicar los distintos comandos que le vamos aplicar a la tabla.
db.once('open', async () => {
    //console.log('--------------Inicio de registro de inventario----------------');
    try {
        await Inventario.createInstance(
            '000001',     // Id_Lote       
            '001-000001', // Id_Productos
            'YK-01',      // Id_Vendedor
            '01/02/2025', // fechaElaboracion
            '01/06/2025', // fechaVencimiento
            150,          // stock
        );

        //console.log('--------------Registro de inventario ok------------------------');
    } catch(err) {
       //console.log('error venta', err);
    };

    //console.log('--------------Inicio de registro de inventario ----------------');
    try {
        await Inventario.createInstance(
            '000002',     // Id_Lote       
            '002-000001', // Id_Productos
            'YG-01',      // Id_Vendedor
            '01/04/2025', // fechaElaboracion
            '01/08/2025', // fechaVencimiento
            50,           // stock
        );

        //console.log('--------------Registro de inventario ok 2------------------------');
    } catch(err) {
       //console.log('error venta', err);
    };

    //console.log('--------------Inicio de registro de inventario 3----------------');
    try {
        await Inventario.createInstance(
            '000003',     // Id_Lote       
            '001-000001', // Id_Productos
            'PR-01',      // Id_Vendedor
            '01/07/2025', // fechaElaboracion
            '01/12/2025', // fechaVencimiento
            75,           // stock
        );

        //console.log('--------------Registro de inventario ok 3------------------------');
    } catch(err) {
       //console.log('error venta', err);
    };

    //const inventario = await Inventario.quantityProduct('002-000001');

    //console.log(inventario);
    
    /*const totalInventario = inventario.reduce( (total, item)  => {
        return total + item.stock;
    }, 0);*/

    //console.log( totalInventario );

    // Metodo correcto para cerrar la conexion de la base de datos
    mongoose.connection.close();
});

module.exports = Inventario;